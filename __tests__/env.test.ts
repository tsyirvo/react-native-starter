import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import type { ExpoConfig } from '@expo/config';

const root = process.cwd();
const variables = {
  API_URL: 'https://api.example.com',
  APP_NAME: 'Environment test',
  EAS_PROJECT_ID: '00000000-0000-4000-8000-000000000000',
  EXPO_APPLE_TEAM_ID: 'TESTTEAMID',
  EXPO_UPDATE_URL: 'https://u.expo.dev/00000000-0000-4000-8000-000000000000',
  ITUNES_ITEM_ID: '123456789',
  POSTHOG_API_KEY: 'test-posthog-key',
  REVENUE_CAT_ANDROID_API_KEY: 'test-android-key',
  REVENUE_CAT_APPLE_API_KEY: 'test-apple-key',
  SENTRY_AUTH_TOKEN: 'test-build-only-token',
  SENTRY_DSN: 'https://public@example.com/1',
  SENTRY_ORG: 'test-org',
  SENTRY_PROJECT: 'test-project',
};

const run = (args: string[], overrides: Partial<NodeJS.ProcessEnv> = {}) =>
  spawnSync('node', args, {
    cwd: root,
    encoding: 'utf8',
    env: {
      ...process.env,
      ...variables,
      APP_ENV: 'development',
      CI: '1',
      EXPO_NO_DOTENV: '1',
      EXPO_NO_TELEMETRY: '1',
      NODE_ENV: 'production',
      STORYBOOK_ENABLED: undefined,
      ...overrides,
    },
  });

const envArgs = ['--input-type=module', '-e', "await import('./env.js')"];

describe('injected environment configuration', () => {
  it.each(['development', 'staging', 'production'])(
    'resolves app.config.ts for %s without environment files',
    (appEnv) => {
      const result = run(
        [
          join(root, 'node_modules/expo/bin/cli'),
          'config',
          '--type',
          'public',
          '--json',
        ],
        { APP_ENV: appEnv, APP_NAME: `App ${appEnv}` },
      );
      expect(result.stderr).toBe('');
      expect(result.status).toBe(0);
      const config: ExpoConfig = JSON.parse(result.stdout);
      const suffix = appEnv === 'production' ? '' : `.${appEnv}`;

      expect(config.name).toBe(`App ${appEnv}`);
      expect(config.ios?.bundleIdentifier).toBe(
        `com.tsyirvo.rnstarter${suffix}`,
      );
      expect(config.android?.package).toBe(`com.tsyirvo.rnstarter${suffix}`);
      expect(config.ios?.entitlements?.['aps-environment']).toBe(
        appEnv === 'development' ? 'development' : 'production',
      );
      expect(config.updates?.enabled).toBe(appEnv === 'production');
      expect(config.updates?.url).toBe(variables.EXPO_UPDATE_URL);
      expect(config.extra).toMatchObject({
        API_URL: variables.API_URL,
        APP_ENV: appEnv,
        eas: { projectId: variables.EAS_PROJECT_ID },
      });
      for (const key of [
        'SENTRY_AUTH_TOKEN',
        'SENTRY_ORG',
        'SENTRY_PROJECT',
        'EXPO_APPLE_TEAM_ID',
        'EXPO_ACCOUNT_OWNER',
      ]) {
        expect(config.extra).not.toHaveProperty(key);
      }
      expect(result.stdout).not.toContain(variables.SENTRY_AUTH_TOKEN);
    },
  );

  it.each(Object.keys(variables))('rejects a missing %s', (key) => {
    const result = run(envArgs, { [key]: undefined });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain(key);
    expect(result.stderr).toContain('Doppler');
    expect(result.stderr).not.toContain(variables.SENTRY_AUTH_TOKEN);
  });

  it.each(Object.keys(variables))('rejects an empty %s', (key) => {
    const result = run(envArgs, { [key]: '' });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain(key);
  });

  it('rejects an unknown app environment', () => {
    const result = run(envArgs, { APP_ENV: 'preview' });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('APP_ENV');
  });

  it('keeps the optional Storybook flag in client configuration', () => {
    const result = run(
      [
        '--input-type=module',
        '-e',
        "const { ClientEnv } = await import('./env.js'); console.log(ClientEnv.STORYBOOK_ENABLED)",
      ],
      { STORYBOOK_ENABLED: 'true' },
    );
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe('true');
  });
});

import z from 'zod';

import packageJSON from './package.json' with { type: 'json' };

// Values are injected by Doppler locally and synced EAS environments on builders.
// `.env.example` documents the inputs; it is never loaded at runtime.
// APP_ENV comes from the Doppler config (and the EAS profile on builders). It has
// no default, so a config without it fails validation instead of silently
// resolving to production.
const APP_ENV = process.env.APP_ENV;

// Default values
const BUNDLE_ID = 'com.tsyirvo.rnstarter';
const PACKAGE = 'com.tsyirvo.rnstarter';
const EXPO_ACCOUNT_OWNER = 'tsyirvo';

const withEnvSuffix = (name) => {
  return APP_ENV === 'production' ? name : `${name}.${APP_ENV}`;
};

// Environment variables validation schemas

const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  APP_NAME: z.string().min(1),
  BUNDLE_ID: z.string().min(1),
  PACKAGE: z.string().min(1),
  VERSION: z.string().min(1),

  // ADD CLIENT ENV VARS HERE
  API_URL: z.string().min(1),
  STORYBOOK_ENABLED: z.string().optional(),
  ITUNES_ITEM_ID: z.string().min(1),
  POSTHOG_API_KEY: z.string().min(1),
  SENTRY_DSN: z.string().min(1),
  REVENUE_CAT_APPLE_API_KEY: z.string().min(1),
  REVENUE_CAT_ANDROID_API_KEY: z.string().min(1),
});

const buildTime = z.object({
  EXPO_ACCOUNT_OWNER: z.string().min(1),
  EAS_PROJECT_ID: z.string().min(1),

  // ADD BUILD TIME ENV VARS HERE
  SENTRY_ORG: z.string().min(1),
  SENTRY_PROJECT: z.string().min(1),
  SENTRY_AUTH_TOKEN: z.string().min(1),
  EXPO_APPLE_TEAM_ID: z.string().min(1),
  EXPO_UPDATE_URL: z.string().min(1),
});

// Environment variables config

const _clientEnv = {
  APP_ENV,
  APP_NAME: process.env.APP_NAME,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,

  // ADD ENV VARS HERE TOO
  API_URL: process.env.API_URL,
  STORYBOOK_ENABLED:
    APP_ENV === 'development' ? process.env.STORYBOOK_ENABLED : 'false',
  ITUNES_ITEM_ID: process.env.ITUNES_ITEM_ID,
  POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
  SENTRY_DSN: process.env.SENTRY_DSN,
  REVENUE_CAT_APPLE_API_KEY: process.env.REVENUE_CAT_APPLE_API_KEY,
  REVENUE_CAT_ANDROID_API_KEY: process.env.REVENUE_CAT_ANDROID_API_KEY,
};

const _buildTimeEnv = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID: process.env.EAS_PROJECT_ID,

  // ADD ENV VARS HERE TOO
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  EXPO_APPLE_TEAM_ID: process.env.EXPO_APPLE_TEAM_ID,
  EXPO_UPDATE_URL: process.env.EXPO_UPDATE_URL,
};

const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
};

const merged = buildTime.extend(client.shape);
const parsed = merged.safeParse(_env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    z.treeifyError(parsed.error),

    `\n❌ Required variables must be non-empty in the ${APP_ENV} environment.`,
    '\n💡 Run local commands through Doppler, or sync the matching Doppler config to EAS before a cloud build. See .env.example for required variables.',
  );

  throw new Error(
    'Invalid environment variables, Check terminal for more details ',
  );
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

export { Env, ClientEnv, withEnvSuffix };

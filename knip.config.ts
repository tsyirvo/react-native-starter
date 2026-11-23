import type { KnipConfig } from 'knip';

import { debt } from './knip.debt';

// Knip runs app.config.ts to read its config plugins.
// env.js throws when a required variable is missing, so knip sets placeholders.
const REQUIRED_ENV = [
  'APP_NAME',
  'API_URL',
  'ITUNES_ITEM_ID',
  'POSTHOG_API_KEY',
  'SENTRY_DSN',
  'REVENUE_CAT_APPLE_API_KEY',
  'REVENUE_CAT_ANDROID_API_KEY',
  'EAS_PROJECT_ID',
  'SENTRY_ORG',
  'SENTRY_PROJECT',
  'SENTRY_AUTH_TOKEN',
  'EXPO_APPLE_TEAM_ID',
  'EXPO_UPDATE_URL',
] as const;

process.env.APP_ENV ??= 'development';

for (const name of REQUIRED_ENV) {
  process.env[name] ??= 'knip';
}

const config: KnipConfig = {
  ignore: [
    // Vendored agent skills.
    '.agents/**',
  ],
  ignoreBinaries: [
    // CLIs from outside node_modules.
    'doppler',
    'eas',
    'mise',
    'watchman',
    ...debt.ignoreBinaries,
  ],
  ignoreDependencies: [
    // The expo package bundles it.
    'babel-preset-expo',
    // Named only as a string in buildCacheProvider.
    'eas-build-cache-provider',
    ...debt.ignoreDependencies,
  ],
  ignoreIssues: debt.ignoreIssues,
};

export default config;

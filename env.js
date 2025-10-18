import path from 'path';
import { fileURLToPath } from 'url';
import z from 'zod';
import dotenv from 'dotenv';

import packageJSON from './package.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_ENV = process.env.APP_ENV ?? 'production';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

dotenv.config({ path: envPath });

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
  APP_NAME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),

  // ADD CLIENT ENV VARS HERE
  API_URL: z.string(),
  STORYBOOK_ENABLED: z.string().optional(),
  ITUNES_ITEM_ID: z.string(),
  POSTHOG_API_KEY: z.string(),
  SENTRY_DSN: z.string(),
  ONE_SIGNAL_APP_ID: z.string(),
  REVENUE_CAT_APPLE_API_KEY: z.string(),
  REVENUE_CAT_ANDROID_API_KEY: z.string(),
  APPSFLYER_DEV_KEY: z.string(),
  APPSFLYER_APP_ID: z.string(),
});

const buildTime = z.object({
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string(),

  // ADD BUILD TIME ENV VARS HERE
  SENTRY_ORG: z.string(),
  SENTRY_PROJECT: z.string(),
  SENTRY_AUTH_TOKEN: z.string(),
  EXPO_APPLE_TEAM_ID: z.string(),
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
  STORYBOOK_ENABLED: process.env.STORYBOOK_ENABLED,
  ITUNES_ITEM_ID: process.env.ITUNES_ITEM_ID,
  POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
  SENTRY_DSN: process.env.SENTRY_DSN,
  ONE_SIGNAL_APP_ID: process.env.ONE_SIGNAL_APP_ID,
  REVENUE_CAT_APPLE_API_KEY: process.env.REVENUE_CAT_APPLE_API_KEY,
  REVENUE_CAT_ANDROID_API_KEY: process.env.REVENUE_CAT_ANDROID_API_KEY,
  APPSFLYER_DEV_KEY: process.env.APPSFLYER_DEV_KEY,
  APPSFLYER_APP_ID: process.env.APPSFLYER_APP_ID,
};

const _buildTimeEnv = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID: process.env.EAS_PROJECT_ID,

  // ADD ENV VARS HERE TOO
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  EXPO_APPLE_TEAM_ID: process.env.EXPO_APPLE_TEAM_ID,
};

const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
};

const merged = buildTime.extend(client.shape);
const parsed = merged.safeParse(_env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error(
    '❌ Invalid environment variables:',
    z.treeifyError(parsed.error),

    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`,
  );

  throw new Error(
    'Invalid environment variables, Check terminal for more details ',
  );
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

export { Env, ClientEnv, withEnvSuffix };

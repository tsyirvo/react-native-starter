/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-nodejs-modules */

const path = require('path');
const z = require('zod');

const packageJSON = require('./package.json');

const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

// Default values
const BUNDLE_ID = 'com.tsyirvo.rnstarter';
const PACKAGE = 'com.tsyirvo.rnstarter';
const EXPO_ACCOUNT_OWNER = 'tsyirvo';

const withEnvSuffix = (name) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return APP_ENV === 'production' ? name : `${name}.${APP_ENV}`;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const envVariableSuffix = `_${APP_ENV.toUpperCase()}`;

// Environment variables validation schemas

const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  APP_NAME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),

  // ADD CLIENT ENV VARS HERE
  API_URL: z.string(),
  ITUNES_ITEM_ID: z.string(),
  FLAGSMITH_KEY: z.string(),
  AMPLITUDE_API_KEY: z.string(),
  SENTRY_DSN: z.string(),
  ONE_SIGNAL_APP_ID: z.string(),
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
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,

  // ADD ENV VARS HERE TOO
  APP_NAME: process.env[`APP_NAME${envVariableSuffix}`],
  API_URL: process.env[`API_URL${envVariableSuffix}`],
  ITUNES_ITEM_ID: process.env.ITUNES_ITEM_ID,
  FLAGSMITH_KEY: process.env[`FLAGSMITH_KEY${envVariableSuffix}`],
  AMPLITUDE_API_KEY: process.env[`AMPLITUDE_API_KEY${envVariableSuffix}`],
  SENTRY_DSN: process.env.SENTRY_DSN,
  ONE_SIGNAL_APP_ID: process.env[`ONE_SIGNAL_APP_ID${envVariableSuffix}`],
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

const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`,
  );

  throw new Error(
    'Invalid environment variables, Check terminal for more details ',
  );
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = {
  Env,
  ClientEnv,
  withEnvSuffix,
};

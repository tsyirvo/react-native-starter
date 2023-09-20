import Constants from 'expo-constants';

//@ts-expect-error // We know we're passing the correct environment variables to `extra` in `app.config.ts`
const Env: typeof import('../../../env.js').ClientEnv =
  Constants.expoConfig?.extra ?? {};

const env = Env.APP_ENV;
const version = Env.VERSION;
const buildNumber = Constants.expoConfig?.ios?.buildNumber;
const runtimeVersion = Constants.expoConfig?.runtimeVersion;
const sentryDsn = Env.SENTRY_DSN;
const mixpanelToken = Env.MIXPANEL_TOKEN;
const flagsmithKey = Env.FLAGSMITH_KEY;

const config = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'fr'],
  // Config
  env,
  version,
  buildNumber,
  runtimeVersion,
  // SDK
  sentryDsn,
  mixpanelToken,
  flagsmithKey,
};

export default config;

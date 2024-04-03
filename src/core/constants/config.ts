import Constants from 'expo-constants';

//@ts-expect-error // We know we're passing the correct environment variables to `extra` in `app.config.ts`
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
const Env: typeof import('../../../env.js').ClientEnv =
  Constants.expoConfig?.extra ?? {};

const env = Env.APP_ENV;
const version = Env.VERSION;
const buildNumber = Constants.expoConfig?.ios?.buildNumber;
const runtimeVersion = Constants.expoConfig?.runtimeVersion;
const androidPackageName = Constants.expoConfig?.android?.package ?? '';
const sentryDsn = Env.SENTRY_DSN;
const mixpanelToken = Env.MIXPANEL_TOKEN;
const flagsmithKey = Env.FLAGSMITH_KEY;

export const config = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'fr'],
  // Config
  env,
  isDebug: env === 'development',
  version,
  buildNumber,
  runtimeVersion,
  androidPackageName,
  // SDK
  sentryDsn,
  mixpanelToken,
  flagsmithKey,
};

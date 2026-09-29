import Constants from 'expo-constants';

import { IS_IOS } from './platform';

//@ts-expect-error // We know we're passing the correct environment variables to `extra` in `app.config.ts`

const Env: typeof import('../../../env.js').ClientEnv =
  Constants.expoConfig?.extra ?? {};

const env = Env.APP_ENV;
const version = Env.VERSION;
const iosbuildNumber = Constants.expoConfig?.ios?.buildNumber ?? '';
const androidVersionCode = Constants.expoConfig?.android?.versionCode
  ? Constants.expoConfig.android.versionCode.toString()
  : '';
const runtimeVersion = Constants.expoConfig?.runtimeVersion;
const iosBundleIdentifier = Constants.expoConfig?.ios?.bundleIdentifier ?? '';
const androidPackageName = Constants.expoConfig?.android?.package ?? '';
const itunesItemId = Env.ITUNES_ITEM_ID;

const apiURL = Env.API_URL;
const isStorybookEnabled = Env.STORYBOOK_ENABLED === 'true';

const sentryDsn = Env.SENTRY_DSN;
const posthogApiKey = Env.POSTHOG_API_KEY;
const revenueCatAppleApiKey = Env.REVENUE_CAT_APPLE_API_KEY;
const revenueCatAndroidApiKey = Env.REVENUE_CAT_ANDROID_API_KEY;

export const config = {
  apiURL,
  buildNumber: IS_IOS ? iosbuildNumber : androidVersionCode,
  bundleId: IS_IOS ? iosBundleIdentifier : androidPackageName,
  defaultLocale: 'en' as const,
  env,
  isDebug: env === 'development' || isStorybookEnabled,
  isStorybookEnabled,
  itunesItemId,
  posthogApiKey,
  revenueCatAndroidApiKey,
  revenueCatAppleApiKey,
  runtimeVersion,
  sentryDsn,
  supportedLocales: ['en', 'fr'] as const,
  version,
};

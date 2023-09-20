/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import Constants from 'expo-constants';

const appName = Constants.expoConfig?.extra?.eas?.appName as string;
const env = Constants.expoConfig?.extra?.eas?.appEnv as string;
const version = Constants.expoConfig?.version;
const buildNumber = Constants.expoConfig?.ios?.buildNumber;
const runtimeVersion = Constants.expoConfig?.runtimeVersion;
const sentryDsn = Constants.expoConfig?.extra?.eas?.sentryDsn as string;
const mixpanelToken = Constants.expoConfig?.extra?.eas?.mixpanelToken as string;
const flagsmithKey = Constants.expoConfig?.extra?.eas?.flagsmithKey as string;

const config = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'fr'],
  // Config
  appName,
  env,
  version,
  buildNumber,
  runtimeVersion,
  isDebug: false,
  isTest: process.env.NODE_ENV === 'test',
  // SDK
  sentryDsn,
  mixpanelToken,
  flagsmithKey,
};

export default config;

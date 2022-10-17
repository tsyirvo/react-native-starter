/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import Constants from 'expo-constants';

import { FirebaseOptions } from '../featureFlags/featureFlags.types';

const appName = Constants.expoConfig?.extra?.eas?.appName as string;
const env = Constants.expoConfig?.extra?.eas?.appEnv as string;
const version = Constants.expoConfig?.version;
const buildNumber = Constants.expoConfig?.ios?.buildNumber;
const runtimeVersion = Constants.expoConfig?.runtimeVersion;
const sentryDsn = Constants.expoConfig?.extra?.eas?.sentryDsn as string;
const mixpanelToken = Constants.expoConfig?.extra?.eas?.mixpanelToken as string;
const firebaseConfig = Constants.expoConfig?.extra?.eas
  ?.firebaseConfig as FirebaseOptions;

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
  firebaseConfig,
};

export default config;

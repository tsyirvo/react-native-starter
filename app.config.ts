/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */

import type { ExpoConfig, ConfigContext } from '@expo/config';

import { ClientEnv, Env } from './env';

const isDevelopmentEnv = Env.APP_ENV === 'development';
const isProductionEnv = Env.APP_ENV === 'production';

const plugins: ExpoConfig['plugins'] = [
  'sentry-expo',
  [
    'expo-build-properties',
    {
      ios: {
        flipper: isDevelopmentEnv,
        infoPlist: {
          LSApplicationQueriesSchemes: ['itms-apps'],
        },
      },
    },
  ],
];

// eslint-disable-next-line import/no-default-export
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.APP_NAME,
  description: `${Env.APP_NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  slug: 'rn-starter',
  version: Env.VERSION.toString(),
  runtimeVersion: '1.0.0',
  jsEngine: 'hermes',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: Env.PACKAGE,
  },
  plugins: isProductionEnv ? plugins : [...plugins, '@config-plugins/detox'],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: Env.SENTRY_ORG,
          project: Env.SENTRY_PROJECT,
          authToken: Env.SENTRY_AUTH_TOKEN,
          setCommits: true,
        },
      },
    ],
  },
});

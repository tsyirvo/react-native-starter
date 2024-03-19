/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */

import type { ExpoConfig, ConfigContext } from '@expo/config';

import { ClientEnv, Env } from './env';

const isProductionEnv = Env.APP_ENV === 'production';

const plugins: ExpoConfig['plugins'] = [
  [
    '@sentry/react-native/expo',
    {
      organization: Env.SENTRY_ORG,
      project: Env.SENTRY_PROJECT,
    },
  ],
  'expo-localization',
  [
    'expo-build-properties',
    {
      ios: {
        infoPlist: {
          LSApplicationQueriesSchemes: ['itms-apps'],
        },
      },
    },
  ],
  [
    'app-icon-badge',
    {
      enabled: !isProductionEnv,
      badges: [
        {
          text: Env.APP_ENV,
          type: 'banner',
          position: 'bottom',
          color: 'black',
          background: '#FFFFFF',
        },
        {
          text: `V${Env.VERSION.toString()}`,
          type: 'ribbon',
          color: 'black',
          background: '#FFFFFF',
        },
      ],
    },
  ],
  [
    'expo-font',
    {
      fonts: [
        './assets/fonts/WorkSans-Light.ttf',
        './assets/fonts/WorkSans-Regular.ttf',
        './assets/fonts/WorkSans-Medium.ttf',
        './assets/fonts/WorkSans-Bold.ttf',
      ],
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
  userInterfaceStyle: 'dark',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['./src/assets/images/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#000',
    },
    package: Env.PACKAGE,
  },
  plugins,
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});

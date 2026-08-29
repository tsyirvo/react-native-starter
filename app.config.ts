import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

const isProductionEnv = Env.APP_ENV === 'production';
const isDevelopmentEnv = Env.APP_ENV === 'development';

const plugins: ExpoConfig['plugins'] = [
  [
    '@sentry/react-native',
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
      badges: [
        {
          background: '#FFFFFF',
          color: 'black',
          position: 'bottom',
          text: Env.APP_ENV,
          type: 'banner',
        },
        {
          background: '#FFFFFF',
          color: 'black',
          text: `V${Env.VERSION}`,
          type: 'ribbon',
        },
      ],
      enabled: !isProductionEnv,
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
  'expo-asset',
  'expo-image',
  'expo-status-bar',
  'expo-secure-store',
  'expo-router',
  ['react-native-permissions', { iosPermissions: ['Notifications'] }],
  [
    'expo-splash-screen',
    {
      backgroundColor: '#FFFFFF',
      dark: {
        backgroundColor: '#0C0D0F',
        image: './assets/icons/splash-icon-light.png',
      },
      image: './assets/icons/splash-icon-dark.png',
      imageWidth: 200,
      resizeMode: 'contain',
    },
  ],
];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  android: {
    adaptiveIcon: {
      backgroundColor: '#0C0D0F',
      foregroundImage: './assets/icons/adaptive-icon.png',
      monochromeImage: './assets/icons/adaptive-icon.png',
    },
    icon: './assets/icons/default.png',
    intentFilters: [
      {
        action: 'VIEW',
        category: ['BROWSABLE', 'DEFAULT'],
        data: [
          {
            // TODO(prod): Add correct associated domain config
            host: 'rnstarter.onelink.me',
            pathPrefix: '/XYZ',
            scheme: 'https',
          },
        ],
      },
      {
        action: 'VIEW',
        category: ['BROWSABLE', 'DEFAULT'],
        data: [
          {
            scheme: 'rn-starter',
          },
        ],
      },
    ],
    package: Env.PACKAGE,
    playStoreUrl: `https://play.google.com/store/apps/details?id=${Env.PACKAGE}`,
    predictiveBackGestureEnabled: true,
  },
  assetBundlePatterns: ['./src/assets/images/*'],
  description: `${Env.APP_NAME} Mobile App`,
  experiments: {
    reactCompiler: true,
    typedRoutes: true,
  },
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
  icon: './assets/icons/default.png',
  ios: {
    appStoreUrl: `https://apps.apple.com/app/${Env.ITUNES_ITEM_ID}`,
    bundleIdentifier: Env.BUNDLE_ID,
    entitlements: {
      'aps-environment': isDevelopmentEnv ? 'development' : 'production',
    },
    icon: {
      dark: 'assets/icons/ios-dark.png',
      light: 'assets/icons/ios-light.png',
      tinted: 'assets/icons/ios-tinted.png',
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      ITSAppUsesNonExemptEncryption: false,
      UIBackgroundModes: ['remote-notification'],
    },
    supportsTablet: false,
  },
  locales: {
    en: './src/infra/i18n/nativeFiles/en.json',
    fr: './src/infra/i18n/nativeFiles/fr.json',
  },
  name: Env.APP_NAME,
  orientation: 'portrait',
  owner: Env.EXPO_ACCOUNT_OWNER,
  plugins,
  runtimeVersion: { policy: 'appVersion' },
  scheme: 'rn-starter',
  slug: 'rn-starter',
  updates: {
    enabled: isProductionEnv,
    fallbackToCacheTimeout: 0,
    url: Env.EXPO_UPDATE_URL,
  },
  userInterfaceStyle: 'dark',
  version: Env.VERSION,
});

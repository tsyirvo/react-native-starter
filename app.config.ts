import type { ExpoConfig, ConfigContext } from '@expo/config';

import { ClientEnv, Env } from './env';

const isProductionEnv = Env.APP_ENV === 'production';
const isDevelopmentEnv = Env.APP_ENV === 'development';

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
  'expo-asset',
  'expo-secure-store',
  [
    'onesignal-expo-plugin',
    { mode: isDevelopmentEnv ? 'development' : 'production' },
  ],
  'expo-router',
  ['react-native-appsflyer', {}],
  ['react-native-permissions', { iosPermissions: ['Notifications'] }],
  [
    'expo-splash-screen',
    {
      backgroundColor: '#222222',
      image: './assets/icon.png',
      imageWidth: 200,
    },
  ],
  './src/expoPlugins/withCustomAndroidManifest.js',
];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.APP_NAME,
  description: `${Env.APP_NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: 'rn-starter',
  slug: 'rn-starter',
  version: Env.VERSION.toString(),
  runtimeVersion: { policy: 'appVersion' },
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'dark',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['./src/assets/images/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: Env.BUNDLE_ID,
    // TODO(prod): Add correct associated domain config
    associatedDomains: ['applinks:rnstarter.onelink.me'],
    // TODO(prod): Add correct app store URL
    appStoreUrl: `https://apps.apple.com/app/XXX/${Env.ITUNES_ITEM_ID}`,
    infoPlist: {
      UIBackgroundModes: ['remote-notification'],
      CFBundleAllowMixedLocalizations: true,
      ITSAppUsesNonExemptEncryption: false,
    },
    entitlements: {
      'aps-environment': isDevelopmentEnv ? 'development' : 'production',
      'com.apple.security.application-groups': [
        'group.${ios.bundleIdentifier}.onesignal',
      ],
    },
    icon: {
      dark: 'assets/icon.png',
      light: 'assets/icon.png',
      tinted: 'assets/icon.png',
    },
  },
  android: {
    icon: './assets/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      monochromeImage: './assets/icon.png',
      backgroundColor: '#222222',
    },
    edgeToEdgeEnabled: true,
    package: Env.PACKAGE,
    playStoreUrl: `https://play.google.com/store/apps/details?id=${Env.PACKAGE}`,
    intentFilters: [
      {
        action: 'VIEW',
        data: [
          {
            scheme: 'https',
            // TODO(prod): Add correct associated domain config
            host: 'rnstarter.onelink.me',
            pathPrefix: '/XYZ',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
      {
        action: 'VIEW',
        data: [
          {
            scheme: 'rn-starter',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  locales: {
    fr: './src/core/i18n/infoPlist/fr.json',
    en: './src/core/i18n/infoPlist/en.json',
  },
  experiments: {
    typedRoutes: true,
  },
  newArchEnabled: true,
  plugins,
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});

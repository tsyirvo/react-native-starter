import RNConfig from 'react-native-config';

const config = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'fr'],
  appName: RNConfig.APP_NAME,
  env: RNConfig.ENV,
  isDev: __DEV__,
  sentryDsn: RNConfig.SENTRY_DSN,
  ios: {
    codepushKey: RNConfig.IOS_CODEPUSH_KEY,
  },
  android: {
    codepushKey: RNConfig.ANDROID_CODEPUSH_KEY,
  },
};

export default config;

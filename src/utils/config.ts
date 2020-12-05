import RNConfig from 'react-native-config';

export type SupportedLocales = 'en' | 'fr';

const config = {
  defaultLocale: 'en' as SupportedLocales,
  locales: ['en', 'fr'] as SupportedLocales[],
  appName: RNConfig.APP_NAME,
  env: RNConfig.ENV,
  androidCodepushKey: RNConfig.ANDROID_CODEPUSH_KEY,
  iosCodepushKey: RNConfig.IOS_CODEPUSH_KEY,
};

export default config;

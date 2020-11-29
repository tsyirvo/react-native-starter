import RNConfig from 'react-native-config';

const config = {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
  appName: RNConfig.APP_NAME,
  env: RNConfig.ENV,
  androidCodepushKey: RNConfig.ANDROID_CODEPUSH_KEY,
  iosCodepushKey: RNConfig.IOS_CODEPUSH_KEY,
};

export default config;

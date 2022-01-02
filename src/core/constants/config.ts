import RNConfig from 'react-native-config';

import { version, buildNumber, codePush } from '../../../package.json';

import { isIOS } from './platform';

const config = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'fr'],
  // Config
  appName: RNConfig.APP_NAME,
  version,
  buildNumber,
  codePush,
  env: RNConfig.ENV,
  isDebug: __DEV__,
  isTest: process.env.NODE_ENV === 'test',
  // SDK
  sentryDsn: RNConfig.SENTRY_DSN,
  mixpanelToken: RNConfig.MIXPANEL_TOKEN,
  codepushKey: isIOS
    ? RNConfig.IOS_CODEPUSH_KEY
    : RNConfig.ANDROID_CODEPUSH_KEY,
};

export default config;

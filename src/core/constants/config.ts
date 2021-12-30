import RNConfig from 'react-native-config';

import { isIOS } from './platform';

const config = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'fr'],
  appName: RNConfig.APP_NAME,
  env: RNConfig.ENV,
  isDebug: __DEV__,
  sentryDsn: RNConfig.SENTRY_DSN,
  mixpanelToken: RNConfig.MIXPANEL_TOKEN,
  codepushKey: isIOS
    ? RNConfig.IOS_CODEPUSH_KEY
    : RNConfig.ANDROID_CODEPUSH_KEY,
};

export default config;

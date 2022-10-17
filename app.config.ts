/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */

import { ExpoConfig, ConfigContext } from '@expo/config';

const appEnv = process.env.APP_ENV;

let Config = {
  appEnv,
  appName: 'RN Starter',
  iosBundleId: 'com.tsyirvo.rnstarter',
  androidPackageName: 'com.tsyirvo.rnstarter',
};

if (appEnv === 'development') {
  Config.appName = 'Dev';
  Config.iosBundleId = 'com.tsyirvo.rnstarter.development';
  Config.androidPackageName = 'com.tsyirvo.rnstarter.development';
} else if (appEnv === 'test') {
  Config.appName = 'Test';
  Config.iosBundleId = 'com.tsyirvo.rnstarter.test';
  Config.androidPackageName = 'com.tsyirvo.rnstarter.test';
} else if (appEnv === 'staging') {
  Config.appName = 'Staging';
  Config.iosBundleId = 'com.tsyirvo.rnstarter.staging';
  Config.androidPackageName = 'com.tsyirvo.rnstarter.staging';
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Config.appName,
  slug: 'rn-starter',
  plugins:
    appEnv === 'test' && config.plugins
      ? [...config.plugins, '@config-plugins/detox']
      : config.plugins,
  ios: {
    ...config.ios,
    bundleIdentifier: Config.iosBundleId,
  },
  android: {
    ...config.android,
    package: Config.androidPackageName,
  },
  extra: {
    ...config.extra,
    eas: {
      ...config.extra?.eas,
      ...Config,
    },
  },
});

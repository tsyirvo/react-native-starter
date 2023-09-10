/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */

import { ExpoConfig, ConfigContext } from '@expo/config';

const appEnv = (process as NodeJS.Process).env.APP_ENV;

let Config = {
  appEnv,
  appName: 'RN Starter',
  iosBundleId: 'com.tsyirvo.rnstarter',
  androidPackageName: 'com.tsyirvo.rnstarter',
};

switch (appEnv) {
  case 'development':
    Config.appName = 'Dev';
    Config.iosBundleId = 'com.tsyirvo.rnstarter.development';
    Config.androidPackageName = 'com.tsyirvo.rnstarter.development';
    break;
  case 'test:debug':
    Config.appName = 'TestDebug';
    Config.iosBundleId = 'com.tsyirvo.rnstarter.test.debug';
    Config.androidPackageName = 'com.tsyirvo.rnstarter.test.debug';
    break;
  case 'test:release':
    Config.appName = 'TestRelease';
    Config.iosBundleId = 'com.tsyirvo.rnstarter.test.release';
    Config.androidPackageName = 'com.tsyirvo.rnstarter.test.release';
    break;
  case 'staging':
    Config.appName = 'Staging';
    Config.iosBundleId = 'com.tsyirvo.rnstarter.staging';
    Config.androidPackageName = 'com.tsyirvo.rnstarter.staging';
    break;
  default:
    break;
}

const isTestEnv = appEnv === 'test:debug' || appEnv === 'test:release';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Config.appName,
  slug: 'rn-starter',
  plugins:
    isTestEnv && config.plugins
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

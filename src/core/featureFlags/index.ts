import remoteConfig from '@react-native-firebase/remote-config';

import Logger from '$core/logger';
import { errors } from '$core/monitoring/constants';

import { FeatureFlagsType } from './featureFlags.types';

class FeatureFlagsClass {
  /* ***** *****  Setup  ***** ***** */

  async init() {
    try {
      await this.setDefault();
      await this.fetchConfig();
    } catch (error) {
      Logger.error({
        error,
        type: errors.sdk,
        message: 'Failed to initialize FeatureFlags',
      });
    }
  }

  async setDefault() {
    try {
      await remoteConfig().setDefaults({
        areFeatureFlagsEnabled: true,
      });
    } catch (error) {
      Logger.error({
        error,
        type: errors.sdk,
        message: 'Failed to set default remoteConfig',
      });
    }
  }

  async fetchConfig() {
    try {
      await remoteConfig().fetchAndActivate();
    } catch (error) {
      Logger.error({
        error,
        type: errors.sdk,
        message: 'Failed to fetch remoteConfig',
      });
    }
  }

  /* ***** *****  Reading values  ***** ***** */

  getStringValue(key: FeatureFlagsType) {
    const flag = remoteConfig().getValue(key);

    return flag.asString();
  }

  getNumberValue(key: FeatureFlagsType) {
    const flag = remoteConfig().getValue(key);

    return flag.asNumber();
  }

  getBooleanValue(key: FeatureFlagsType) {
    const flag = remoteConfig().getValue(key);

    return flag.asBoolean();
  }

  getAllValues() {
    const allFlags = remoteConfig().getAll();

    return allFlags;
  }

  /* ***** *****  Misc  ***** ***** */

  getValueSource(key: FeatureFlagsType) {
    const flag = remoteConfig().getValue(key);
    const source = flag.getSource();

    return source;
  }
}

const FeatureFlags = new FeatureFlagsClass();

export default FeatureFlags;

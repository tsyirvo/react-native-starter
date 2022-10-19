import { initializeApp } from 'firebase/app';
import {
  getRemoteConfig,
  getValue,
  fetchAndActivate,
  fetchConfig,
  getAll,
  getBoolean,
  getString,
  getNumber,
} from 'firebase/remote-config';

import { config } from '$core/constants';
import Logger from '$core/logger';
import { errors } from '$core/monitoring/constants';

import defaultConfig from './config';
import type { FeatureFlagsType } from './featureFlags.types';

const app = initializeApp(config.firebaseConfig);
const remoteConfig = getRemoteConfig(app);

class FeatureFlagsClass {
  /* ***** *****  Setup  ***** ***** */

  async init() {
    try {
      this.setDefault();
      await this.fetchAndActivateConfig();

      if (config.isDebug) {
        await this.forceFetch();
      }
    } catch (error) {
      Logger.error({
        error,
        type: errors.sdk,
        message: 'Failed to initialize FeatureFlags',
      });
    }
  }

  setDefault() {
    remoteConfig.defaultConfig = defaultConfig;
  }

  async fetchAndActivateConfig() {
    try {
      await fetchAndActivate(remoteConfig);
    } catch (error) {
      Logger.error({
        error,
        type: errors.sdk,
        message: 'Failed to fetch remoteConfig',
      });
    }
  }

  async forceFetch() {
    await fetchConfig(remoteConfig);
  }

  async checkFetchStatus() {
    const fetchStatus = remoteConfig.lastFetchStatus;

    if (fetchStatus !== 'success') {
      await this.forceFetch();
    }

    return fetchStatus;
  }

  /* ***** *****  Reading values  ***** ***** */

  getStringValue(key: FeatureFlagsType) {
    return getString(remoteConfig, key);
  }

  getNumberValue(key: FeatureFlagsType) {
    return getNumber(remoteConfig, key);
  }

  getBooleanValue(key: FeatureFlagsType) {
    return getBoolean(remoteConfig, key);
  }

  getAllValues() {
    return getAll(remoteConfig);
  }

  getValueSource(key: FeatureFlagsType) {
    const flag = getValue(remoteConfig, key);

    return flag.getSource();
  }
}

const FeatureFlags = new FeatureFlagsClass();

export default FeatureFlags;

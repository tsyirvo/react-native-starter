import flagsmith from 'flagsmith';

import { config } from '$core/constants';
import Logger from '$core/logger';
import { errors } from '$core/monitoring/constants';

import { defaultFlags } from './defaultFlags';
import {
  FlagOptions,
  FlagsmithValue,
  TraitOptions,
} from './featureFlags.types';

const MILLISECONDS_IN_A_DAY = 86400000;

const cacheOptions = {
  skipAPI: true,
  ttl: MILLISECONDS_IN_A_DAY,
};

const options = {
  environmentID: config.flagsmithKey,
  cacheFlags: true,
  cacheOptions,
  defaultFlags,
  // TODO: add proper user identity and traits
  identity: 'user-123',
  traits: {
    'trait-1': 'value-1',
    'trait-2': 2,
    'trait-3': true,
  },
};

class FeatureFlagsClass {
  /* ***** *****  init  ***** ***** */

  async init() {
    try {
      await flagsmith.init(options);
    } catch (error) {
      Logger.error({
        error,
        type: errors.flagsmith,
        message: 'Error during init',
      });
    }
  }

  /* ***** *****  session  ***** ***** */

  async identify(userId: string, traits?: Record<string, FlagsmithValue>) {
    try {
      await flagsmith.identify(userId, traits);
    } catch (error) {
      Logger.error({
        error,
        type: errors.flagsmith,
        message: 'Error while loging out',
      });
    }
  }

  async logout() {
    try {
      await flagsmith.logout();
    } catch (error) {
      Logger.error({
        error,
        type: errors.flagsmith,
        message: 'Error while loging out',
      });
    }
  }

  /* ***** *****  Flags  ***** ***** */

  isFlagEnabled(flagKey: FlagOptions) {
    return flagsmith.hasFeature(flagKey);
  }

  getFlagValue(flagKey: FlagOptions) {
    return flagsmith.getValue(flagKey);
  }

  async refetchFlags() {
    try {
      await flagsmith.getFlags();
    } catch (error) {
      Logger.error({
        error,
        type: errors.flagsmith,
        message: 'Error while refetching the flags',
      });
    }
  }

  /* ***** *****  Traits  ***** ***** */

  getUserTrait(traitName: TraitOptions) {
    return flagsmith.getTrait(traitName);
  }

  getAllUserTraits() {
    return flagsmith.getAllTraits();
  }

  async setUserTrait(traitName: TraitOptions, traitValue: FlagsmithValue) {
    try {
      await flagsmith.setTrait(traitName, traitValue);
    } catch (error) {
      Logger.error({
        error,
        type: errors.flagsmith,
        message: 'Error while setting a trait',
      });
    }
  }

  async setUserTraits(traits: Record<TraitOptions, FlagsmithValue>) {
    try {
      await flagsmith.setTraits(traits);
    } catch (error) {
      Logger.error({
        error,
        type: errors.flagsmith,
        message: 'Error while setting multiple traits',
      });
    }
  }
}

const FeatureFlags = new FeatureFlagsClass();

export default FeatureFlags;

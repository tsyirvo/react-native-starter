import { productTrackingClient } from '$infra/productTracking';

import { defaultRemoteConfig } from '../defaultFlags';
import type { AvailableRemoteConfig } from '../featureFlags.types';

export const useGetRemoteConfigSync = () => {
  const getFlagPayloadSync = <T>(flagKey: AvailableRemoteConfig) => {
    const result = productTrackingClient.getFeatureFlagResult(flagKey);
    const value = result?.payload;

    if (!value) {
      return defaultRemoteConfig[flagKey];
    }

    return value as T | undefined;
  };

  return {
    getFlagPayloadSync,
  };
};

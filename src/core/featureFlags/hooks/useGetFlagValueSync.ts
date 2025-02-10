import { productTrackingClient } from '$core/productTracking';

import type { AvailableFeatureFlags } from '../featureFlags.types';

export const useGetFlagValueSync = () => {
  const getFlagValueSync = (flagKey: AvailableFeatureFlags) => {
    const value = productTrackingClient.getFeatureFlag(flagKey);

    return value;
  };

  return {
    getFlagValueSync,
  };
};

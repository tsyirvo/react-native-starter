import { useFlagsmith } from 'react-native-flagsmith/react';

import type { FlagOptions } from '../featureFlags.types';

export const useGetFlagValueSync = () => {
  const flagsmith = useFlagsmith();

  const getFlagValueSync = (flagKey: FlagOptions) => {
    const value = flagsmith.getValue(flagKey);

    return value;
  };

  return {
    getFlagValueSync,
  };
};

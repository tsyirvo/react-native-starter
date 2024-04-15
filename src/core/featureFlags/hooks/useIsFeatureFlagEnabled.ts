import { useFlags } from 'react-native-flagsmith/react';

import type { FlagOptions, TraitOptions } from '../featureFlags.types';

export function useIsFeatureFlagEnabled(flagKey: FlagOptions) {
  const flag = useFlags<FlagOptions, TraitOptions>([flagKey])[flagKey];

  return flag.enabled;
}

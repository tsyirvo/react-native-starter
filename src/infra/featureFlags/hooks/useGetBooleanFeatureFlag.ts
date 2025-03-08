import { useFeatureFlag } from 'posthog-react-native';

import type { BooleanFeatureFlags } from '../featureFlags.types';

export function useGetBooleanFeatureFlag(flagKey: BooleanFeatureFlags) {
  const flag = useFeatureFlag(flagKey);

  if (typeof flag === 'boolean' && flag) {
    return true;
  }

  return false;
}

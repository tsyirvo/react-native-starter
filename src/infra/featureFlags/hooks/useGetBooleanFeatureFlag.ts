import { useFeatureFlag } from 'posthog-react-native';

import type { BooleanFeatureFlags } from '../featureFlags.types';

export function useGetBooleanFeatureFlag(flagKey: BooleanFeatureFlags) {
  const flag = useFeatureFlag(flagKey);

  return !!(typeof flag === 'boolean' && flag);
}

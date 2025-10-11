import { useFeatureFlag } from 'posthog-react-native';

import type { AvailableFeatureFlags } from '../featureFlags.types';

export function useGetFeatureFlag(flagKey: AvailableFeatureFlags) {
  const flag = useFeatureFlag(flagKey);

  return flag;
}

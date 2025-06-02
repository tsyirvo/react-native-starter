import { useFeatureFlag } from 'posthog-react-native';
import type { FeatureFlagValue } from 'posthog-react-native/lib/posthog-core/src';

import type { AvailableFeatureFlags } from '../featureFlags.types';

export function useGetFeatureFlag(flagKey: AvailableFeatureFlags) {
  const flag = useFeatureFlag(flagKey) as FeatureFlagValue;

  return flag;
}

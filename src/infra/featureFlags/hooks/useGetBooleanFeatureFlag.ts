import { useFeatureFlag } from 'posthog-react-native';
import type { FeatureFlagValue } from 'posthog-react-native/lib/posthog-core/src';

import type { BooleanFeatureFlags } from '../featureFlags.types';

export function useGetBooleanFeatureFlag(flagKey: BooleanFeatureFlags) {
  const flag = useFeatureFlag(flagKey) as FeatureFlagValue;

  if (typeof flag === 'boolean' && flag) {
    return true;
  }

  return false;
}

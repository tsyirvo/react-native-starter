import { useFeatureFlagWithPayload } from 'posthog-react-native';

import { defaultRemoteConfig } from '../defaultFlags';
import type { AvailableRemoteConfig } from '../featureFlags.types';

export function useGetRemoteConfig(flagKey: AvailableRemoteConfig) {
  const flag = useFeatureFlagWithPayload(flagKey);

  if (!flag[FLAG_VALUE_INDEX]) {
    return defaultRemoteConfig[flagKey];
  }

  return flag;
}

const FLAG_VALUE_INDEX = 1;

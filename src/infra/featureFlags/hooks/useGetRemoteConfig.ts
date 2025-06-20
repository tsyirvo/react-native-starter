import { useFeatureFlagWithPayload } from 'posthog-react-native';

import { defaultRemoteConfig } from '../defaultFlags';
import type { AvailableRemoteConfig } from '../featureFlags.types';

export function useGetRemoteConfig(flagKey: AvailableRemoteConfig) {
  const flag = useFeatureFlagWithPayload(flagKey);

  if (flag[FLAG_VALUE_INDEX] !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return flag[FLAG_VALUE_INDEX];
  }

  return defaultRemoteConfig[flagKey];
}

const FLAG_VALUE_INDEX = 1;

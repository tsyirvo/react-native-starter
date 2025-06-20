import type { ReactNode } from 'react';

import type { BooleanFeatureFlags } from '../featureFlags.types';
import { useGetBooleanFeatureFlag } from '../hooks/useGetBooleanFeatureFlag';

export const FeatureFlagSplitter = ({
  children = null,
  ifOn = null,
  ifOff = null,
  flagKey,
}: {
  children?: ReactNode;
  ifOn?: ReactNode;
  ifOff?: ReactNode;
  flagKey: BooleanFeatureFlags;
}): ReactNode => {
  const isEnabled = useGetBooleanFeatureFlag(flagKey);

  if (isEnabled) {
    return children ?? ifOn;
  }

  return ifOff;
};

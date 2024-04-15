import type { ReactNode } from 'react';

import type { FlagOptions } from '../featureFlags.types';
import { useIsFeatureFlagEnabled } from '../hooks/useIsFeatureFlagEnabled';

export const FeatureFlagSplitter = ({
  children = null,
  ifOn = null,
  ifOff = null,
  flagKey,
}: {
  children?: ReactNode;
  ifOn?: ReactNode;
  ifOff?: ReactNode;
  flagKey: FlagOptions;
}) => {
  const isEnabled = useIsFeatureFlagEnabled(flagKey);

  if (isEnabled) {
    return children ?? ifOn;
  }

  return ifOff;
};

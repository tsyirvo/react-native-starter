import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { useReducedMotion as useIsReduceMotionEnabledAtLaunch } from 'react-native-reanimated';

import { Logger } from '$infra/logger';

export const useIsReduceMotionEnabled = () => {
  const isEnabledAtLaunch = useIsReduceMotionEnabledAtLaunch();

  const [isReduceMotionEnabled, setIsReduceMotionEnabled] =
    useState(isEnabledAtLaunch);

  useEffect(() => {
    let isMounted = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((isEnabled) => {
        if (isMounted) {
          setIsReduceMotionEnabled(isEnabled);
        }
      })
      .catch((error: unknown) => {
        Logger.error({
          error,
          message: 'Failed to read the reduce motion state',
        });
      });

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsReduceMotionEnabled,
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return isReduceMotionEnabled;
};

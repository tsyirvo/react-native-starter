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
    let hasReceivedChange = false;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((isEnabled) => {
        if (isMounted && !hasReceivedChange) {
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
      (isEnabled) => {
        hasReceivedChange = true;
        setIsReduceMotionEnabled(isEnabled);
      },
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return isReduceMotionEnabled;
};

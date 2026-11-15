import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { useReducedMotion as useIsReduceMotionEnabledAtLaunch } from 'react-native-reanimated';

export const useIsReduceMotionEnabled = () => {
  const isEnabledAtLaunch = useIsReduceMotionEnabledAtLaunch();

  const [isReduceMotionEnabled, setIsReduceMotionEnabled] =
    useState(isEnabledAtLaunch);

  useEffect(() => {
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsReduceMotionEnabled,
    );

    return () => subscription.remove();
  }, []);

  return isReduceMotionEnabled;
};

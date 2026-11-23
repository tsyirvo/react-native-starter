import type React from 'react';
import { useCallback } from 'react';
import type { GestureResponderEvent, PressableProps } from 'react-native';
import { Pressable as RNPressable } from 'react-native';

import type { HapticFeedbackType } from '$infra/haptics';
import { triggerHapticFeedback } from '$infra/haptics';
import { useDebouncedFunction } from '$shared/hooks';

type CustomPressableProps = PressableProps & {
  accessibilityLabel: string;
  accessibilityRole: PressableProps['accessibilityRole'];
  hapticFeedback?: boolean;
  hapticFeedbackType?: HapticFeedbackType;
  children: React.ReactNode;
};

export const Pressable = ({
  hapticFeedback = false,
  hapticFeedbackType = 'light',
  children,
  onPress,
  ...props
}: CustomPressableProps) => {
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (hapticFeedback || hapticFeedbackType !== 'light') {
        triggerHapticFeedback(hapticFeedbackType);
      }

      onPress?.(event);
    },
    [hapticFeedback, hapticFeedbackType, onPress],
  );

  const debouncedPress = useDebouncedFunction(handlePress);

  return (
    <RNPressable disabled={!onPress} onPress={debouncedPress} {...props}>
      {children}
    </RNPressable>
  );
};

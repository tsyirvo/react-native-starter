/* eslint-disable react-hooks/immutability */

import type React from 'react';
import { GestureResponderEvent, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { UnistylesThemes } from 'react-native-unistyles';
import { useUnistyles } from 'react-native-unistyles';

import { HIT_SLOP } from '$domain/constants/styling';
import { Pressable } from '$shared/components/Pressable';

import { buttonVariants, type ButtonVariant } from './buttonVariants';
import type { ButtonProps } from './types/buttonTypes';

interface BaseButtonProps extends ButtonProps {
  children: React.ReactElement;
}

export const BaseButton = ({
  variant = 'primary',
  isLoading = false,
  isDisabled = false,
  targetScale = DEFAULT_TARGET_SCALE,
  children,
  testID = 'BaseButton',
  onPress,
}: BaseButtonProps) => {
  const scale = useSharedValue(REST_TARGET_SCALE);

  const { theme } = useUnistyles();

  const isReducedMotion = useReducedMotion();

  const isVisuallyDisabled = isDisabled && !isLoading;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    cancelAnimation(scale);

    scale.value = withTiming(targetScale, { duration: ANIMATION_DURATION });
  };

  const handlePressOut = () => {
    cancelAnimation(scale);

    scale.value = withTiming(REST_TARGET_SCALE, {
      duration: ANIMATION_DURATION,
    });
  };

  const buttonStyle = getButtonStyle(variant, theme.colors);

  return (
    <AnimatedPressable
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      accessibilityRole="button"
      accessibilityState={{ busy: isLoading }}
      disabled={isLoading || isDisabled}
      hitSlop={HIT_SLOP}
      testID={testID}
      style={[
        !isReducedMotion && animatedStyle,
        {
          opacity: isVisuallyDisabled ? DISABLED_OPACITY : REGULAR_OPACITY,
        },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress as (event: GestureResponderEvent) => void}
    >
      <View style={[buttonVariants[variant], buttonStyle]}>{children}</View>
    </AnimatedPressable>
  );
};

const DEFAULT_TARGET_SCALE = 0.98;
const REST_TARGET_SCALE = 1;
const ANIMATION_DURATION = 100;

const DISABLED_OPACITY = 0.5;
const REGULAR_OPACITY = 1;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getButtonStyle = (
  variant: ButtonVariant,
  colors:
    | UnistylesThemes['light']['colors']
    | UnistylesThemes['dark']['colors'],
) => {
  switch (variant) {
    case 'primary':
    case 'primary_compact':
      return { backgroundColor: colors.core_primary };
    case 'outline':
    case 'outline_compact':
      return { borderColor: colors.border_default };
    case 'text':
    case 'text_compact':
      return { backgroundColor: colors.bg_base };
    default:
      return {};
  }
};

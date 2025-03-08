import type { VariantProps } from '@shopify/restyle';
import { createRestyleComponent, createVariant } from '@shopify/restyle';
import type React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { HIT_SLOP } from '$domain/constants/styling';
import type { Theme } from '$domain/theme';
import type { Box } from '$shared/uiKit/primitives';

import type { ButtonProps } from './types/buttonTypes';

interface BaseButtonProps extends ButtonProps {
  children: React.ReactElement;
}

const ButtonVariant = createVariant({
  themeKey: 'buttonVariants',
});

const PrimitiveButton = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([ButtonVariant]);

export const BaseButton = ({
  variant = 'base',
  isLoading = false,
  isDisabled = false,
  targetScale = DEFAULT_TARGET_SCALE,
  children,
  testID = 'BaseButton',
  onPress,
}: BaseButtonProps) => {
  const scale = useSharedValue(REST_TARGET_SCALE);

  const isReducedMotion = useReducedMotion();

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

  return (
    <AnimatedPressable
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      accessibilityRole="button"
      accessibilityState={{ busy: isLoading }}
      disabled={isLoading || isDisabled}
      hitSlop={HIT_SLOP}
      testID={testID}
      style={!isReducedMotion && animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <PrimitiveButton variant={variant}>{children}</PrimitiveButton>
    </AnimatedPressable>
  );
};

const DEFAULT_TARGET_SCALE = 0.98;
const REST_TARGET_SCALE = 1;
const ANIMATION_DURATION = 100;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

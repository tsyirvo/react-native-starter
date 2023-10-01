import type { VariantProps } from '@shopify/restyle';
import { createRestyleComponent, createVariant } from '@shopify/restyle';
import React from 'react';
import { Pressable } from 'react-native';

import { HIT_SLOP } from '$core/constants/styling';
import type { Theme } from '$core/theme';
import type { Box } from '$shared/uiKit/primitives';

import type { ButtonProps } from './Button.types';

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

function BaseButton({
  onPress,
  variant = 'base',
  testID,
  isLoading = false,
  children,
  isDisabled,
}: BaseButtonProps) {
  return (
    <Pressable
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      accessibilityRole="button"
      accessibilityState={{ busy: isLoading }}
      disabled={isLoading || isDisabled}
      hitSlop={HIT_SLOP}
      testID={testID}
      onPress={onPress}
    >
      <PrimitiveButton variant={variant}>{children}</PrimitiveButton>
    </Pressable>
  );
}

export { BaseButton };

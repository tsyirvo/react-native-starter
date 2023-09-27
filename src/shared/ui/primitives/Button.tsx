/* eslint-disable react/jsx-props-no-spreading */

import type { VariantProps } from '@shopify/restyle';
import { createRestyleComponent, createVariant } from '@shopify/restyle';
import React from 'react';
import { Pressable } from 'react-native';

import type { Theme } from '$core/theme';

import type { BoxProps } from './Box';
import { Box } from './Box';
import { Text } from './Text';

interface ButtonProps extends BoxProps, VariantProps<Theme, 'buttonVariants'> {
  onPress: () => void;
  label: string;
  testID?: string;
  isEnabled?: boolean;
}

const ButtonVariant = createVariant({
  themeKey: 'buttonVariants',
});

const PrimitiveButton = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([ButtonVariant]);

export function Button({
  onPress,
  label,
  variant = 'base',
  testID,
  isEnabled = true,
  ...rest
}: ButtonProps) {
  return (
    <PrimitiveButton variant={variant}>
      <Pressable disabled={!isEnabled} testID={testID} onPress={onPress}>
        <Box {...rest}>
          <Text>{label}</Text>
        </Box>
      </Pressable>
    </PrimitiveButton>
  );
}

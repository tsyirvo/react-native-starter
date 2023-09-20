/* eslint-disable react/jsx-props-no-spreading */

import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import { Pressable } from 'react-native';

import type { Theme } from '$core/theme';

import { Box, BoxProps } from './Box';
import { Text } from './Text';

type ButtonProps = BoxProps &
  VariantProps<Theme, 'buttonVariants'> & {
    onPress: () => void;
    label: string;
    testID?: string;
    isEnabled?: boolean;
  };

const ButtonVariant = createVariant({
  themeKey: 'buttonVariants',
});

const PrimitiveButton = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([ButtonVariant]);

export const Button = ({
  onPress,
  label,
  variant = 'base',
  testID,
  isEnabled = true,
  ...rest
}: ButtonProps) => (
  <PrimitiveButton variant={variant}>
    <Pressable disabled={!isEnabled} testID={testID} onPress={onPress}>
      <Box {...rest}>
        <Text>{label}</Text>
      </Box>
    </Pressable>
  </PrimitiveButton>
);

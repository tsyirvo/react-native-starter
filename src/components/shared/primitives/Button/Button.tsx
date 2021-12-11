/* eslint-disable react/jsx-props-no-spreading */

import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  VariantProps,
  createVariant,
  createRestyleComponent,
} from '@shopify/restyle';
import { Pressable } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
import { Theme } from '$styles/theme';

const restyleFunctions = [spacing, border, backgroundColor];

type BaseProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;

type ButtonProps = BaseProps &
  VariantProps<Theme, 'buttonVariants'> & {
    onPress: () => void;
    label: string;
  };

const ButtonVariant = createVariant({
  themeKey: 'buttonVariants',
});

const PrimitiveButton = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([ButtonVariant], Pressable);

const Button = ({ onPress, label, ...rest }: ButtonProps) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <PrimitiveButton>
      <Pressable onPress={onPress}>
        <Box {...props}>
          <Text>{label}</Text>
        </Box>
      </Pressable>
    </PrimitiveButton>
  );
};

export default Button;

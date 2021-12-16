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
  layout,
  LayoutProps,
  SpacingShorthandProps,
  spacingShorthand,
  BackgroundColorShorthandProps,
  backgroundColorShorthand,
} from '@shopify/restyle';
import { Pressable } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
import { Theme } from '$styles/theme';

const restyleFunctions = [
  spacing,
  spacingShorthand,
  backgroundColor,
  backgroundColorShorthand,
  border,
  layout,
];

type BaseProps = SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme>;

type ButtonProps = BaseProps &
  VariantProps<Theme, 'buttonVariants'> & {
    onPress: () => void;
    label: string;
    testID?: string;
  };

const ButtonVariant = createVariant({
  themeKey: 'buttonVariants',
});

const PrimitiveButton = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([ButtonVariant]);

const Button = ({
  onPress,
  label,
  variant = 'base',
  testID,
  ...rest
}: ButtonProps) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <PrimitiveButton variant={variant}>
      <Pressable testID={testID} onPress={onPress}>
        <Box {...props}>
          <Text>{label}</Text>
        </Box>
      </Pressable>
    </PrimitiveButton>
  );
};

export default Button;

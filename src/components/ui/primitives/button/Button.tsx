/* eslint-disable react/jsx-props-no-spreading */

import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import { Pressable } from 'react-native';

import Box from '$components/ui/primitives/box/Box';
import Text from '$components/ui/primitives/text/Text';
import { Theme } from '$styles/theme';

import { BoxProps } from '../box/Box';

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

const Button = ({
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

export default Button;

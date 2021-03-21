import React, { ReactElement } from 'react';
import { Pressable, PressableProps } from 'react-native';
import styled from 'styled-components/native';
import {
  space,
  layout,
  color,
  flexbox,
  border,
  borderRadius,
  position,
  typography,
  variant,
} from 'styled-system';

import { ButtonProps, VariantProps } from './Button.types';
import variants from './Button.variants';

type Props = PressableProps &
  ButtonProps &
  VariantProps & {
    onPress: () => void;
    children: ReactElement;
  };

const SButton = styled(Pressable)<ButtonProps & VariantProps>`
  ${variant({
    variants,
  })}
  ${space}
  ${layout}
  ${color}
  ${border}
  ${borderRadius}
  ${position}
  ${typography}
  ${flexbox}
`;

SButton.defaultProps = {
  variant: 'base',
};

const Button = ({ onPress, children, ...rest }: Props) => (
  <SButton onPress={onPress} {...rest}>
    {children}
  </SButton>
);

export default Button;

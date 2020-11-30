import React, { ReactElement } from 'react';
import { Pressable, PressableProps } from 'react-native';

type Props = PressableProps & {
  children: ReactElement;
  testID?: string | undefined;
};

const Button = ({ children, testID, ...rest }: Props) => (
  <Pressable testID={testID} {...rest}>
    {children}
  </Pressable>
);

Button.defaultProps = {
  testID: undefined,
};

export default Button;

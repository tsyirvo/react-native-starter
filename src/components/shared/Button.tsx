import React, { ReactElement } from 'react';
import { Pressable } from 'react-native';

interface IProps {
  onPress: () => void;
  children: Element;
  testID?: string | undefined;
}

const Button = ({ onPress, children, testID }: IProps): ReactElement => (
  <Pressable testID={testID} onPress={onPress}>
    {children}
  </Pressable>
);

Button.defaultProps = {
  testID: undefined,
};

export default Button;

import React from 'react';
import { TouchableOpacity } from 'react-native';

interface IProps {
  onPress: () => void;
  children?: Element;
  testID?: string;
}

const Button = ({ onPress, children }: IProps) => (
  <TouchableOpacity testID="button-touchable" onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export default Button;

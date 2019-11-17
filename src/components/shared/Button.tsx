import React from 'react';
import { TouchableOpacity } from 'react-native';

interface IProps {
  onPress: () => void;
  children?: Element;
  testID?: string;
}

const Button = ({ onPress, children, testID }: IProps) => (
  <TouchableOpacity testID={testID} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export default Button;

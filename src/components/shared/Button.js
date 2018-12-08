import React from 'react';
import { TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
);

export default Button;

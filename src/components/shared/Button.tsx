import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

interface IProps {
  onPress: () => void;
  children: Element;
  testID?: string;
}

const Button = ({ onPress, children, testID }: IProps): ReactElement => (
  <TouchableOpacity testID={testID} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

Button.defaultProps = {
  testID: '',
};

export default Button;

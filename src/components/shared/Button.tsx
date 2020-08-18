import React, { ReactElement } from 'react';
import { Pressable } from 'react-native';

import { Box } from './primitives';
import { BoxProps } from './primitives/Box/Box.types';

type Props = BoxProps & {
  onPress: () => void;
  children: Element;
  testID?: string | undefined;
};

const Button = ({
  onPress,
  children,
  testID,
  ...rest
}: Props): ReactElement => (
  <Pressable testID={testID} onPress={onPress}>
    <Box {...rest}>{children}</Box>
  </Pressable>
);

Button.defaultProps = {
  testID: undefined,
};

export default Button;

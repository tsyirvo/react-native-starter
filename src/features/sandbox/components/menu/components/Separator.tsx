/* eslint-disable react/jsx-props-no-spreading */

import type { Colors } from '$core/theme';
import { Box } from '$shared/uiKit/primitives';
import type { BoxProps } from '$shared/uiKit/primitives/Box';

interface SeparatorProps extends BoxProps {
  height?: number;
  color?: Colors;
}

const DEFAULT_HEIGHT = 2;

export const Separator = ({
  height = DEFAULT_HEIGHT,
  color = 'black',
  ...rest
}: SeparatorProps) => {
  return <Box bg={color} height={height} width="100%" {...rest} />;
};

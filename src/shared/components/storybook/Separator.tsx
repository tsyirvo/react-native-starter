/* eslint-disable react/jsx-props-no-spreading */

import type { Colors } from '$core/theme';
import { Box, type BoxProps } from '$shared/uiKit';

interface SeparatorProps extends BoxProps {
  height?: number;
  color?: Colors;
}

const DEFAULT_HEIGHT = 2;

export const Separator = ({
  height = DEFAULT_HEIGHT,
  color = 'bg_focus',
  ...rest
}: SeparatorProps) => {
  return <Box bg={color} height={height} width="100%" {...rest} />;
};

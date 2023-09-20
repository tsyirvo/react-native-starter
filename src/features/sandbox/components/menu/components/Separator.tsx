/* eslint-disable react/jsx-props-no-spreading */

import type { Colors } from '$core/theme';
import { Box } from '$shared/ui/primitives';
import { BoxProps } from '$shared/ui/primitives/Box';

type SeparatorProps = BoxProps & {
  height?: number;
  color?: Colors;
};

const DEFAULT_HEIGHT = 2;

export const Separator = ({
  height = DEFAULT_HEIGHT,
  color = 'black',
  ...rest
}: SeparatorProps) => <Box bg={color} height={height} width="100%" {...rest} />;

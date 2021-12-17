/* eslint-disable react/jsx-props-no-spreading */

import { Box } from '$components/ui/primitives';
import { BoxProps } from '$components/ui/primitives/box/Box';
import { Colors } from '$styles/colors';

type SeparatorProps = BoxProps & {
  height?: number;
  color?: Colors;
};

const DEFAULT_HEIGHT = 2;

const Separator = ({
  height = DEFAULT_HEIGHT,
  color = 'black',
  ...rest
}: SeparatorProps) => <Box height={height} width="100%" bg={color} {...rest} />;

export default Separator;

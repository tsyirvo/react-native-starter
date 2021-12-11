/* eslint-disable react/jsx-props-no-spreading */

import { Box } from '$components/shared/primitives';
import { BoxProps } from '$components/shared/primitives/box/Box';
import { Colors } from '$styles/colors';

type SeparatorProps = BoxProps & {
  height?: string;
  color?: Colors;
};

const Separator = ({
  height = '2px',
  color = 'black',
  ...rest
}: SeparatorProps) => <Box height={height} width="100%" bg={color} {...rest} />;

export default Separator;

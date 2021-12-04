/* eslint-disable react/jsx-props-no-spreading */

import { Box } from '$components/shared/primitives';
import { BoxProps } from '$components/shared/primitives/Box/Box.types';

type SeparatorProps = BoxProps & {
  height?: string;
  color?: string;
};

const Separator = ({
  height = '2px',
  color = 'black',
  ...rest
}: SeparatorProps) => (
  <Box height={height} width="100%" backgroundColor={color} {...rest} />
);

export default Separator;

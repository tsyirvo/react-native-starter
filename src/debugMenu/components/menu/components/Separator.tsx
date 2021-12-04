import React from 'react';

import { Box } from '$components/shared/primitives';

type SeparatorProps = {
  height?: string;
  color?: string;
};

const Separator = ({ height = '2px', color = 'black' }: SeparatorProps) => (
  <Box height={height} width="100%" backgroundColor={color} />
);

export default Separator;

import React from 'react';

import { Colors } from '$domain/theme';

import { Box } from '../primitives';

interface SeparatorProps {
  color?: Colors;
  height?: number;
}

export const Separator = ({
  color = 'bg_muted',
  height = 1,
}: SeparatorProps) => {
  return <Box bg={color} height={height} width="100%" />;
};

import React from 'react';

import { Box, Text } from '$components/shared/primitives';
import theme from '$styles/theme';

import CenteredContent from '../menu/components/CenteredContent';

const ColorsDebugPage = () => (
  <CenteredContent>
    {(Object.keys(theme.colors) as (keyof typeof theme.colors)[]).map(
      (color) => (
        <Box alignItems="center" key={color} mb={25}>
          <Text>{color}</Text>
          <Box size={100} bg={theme.colors[color]} />
        </Box>
      ),
    )}
  </CenteredContent>
);

export default ColorsDebugPage;

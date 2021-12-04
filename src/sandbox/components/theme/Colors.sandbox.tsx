import React from 'react';
import { ScrollView } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
import theme from '$styles/theme';

import SandBoxItem from '../menu/components/SandboxItem';

const ColorsSandbox = () => (
  <ScrollView>
    <SandBoxItem isSingle>
      {(Object.keys(theme.colors) as (keyof typeof theme.colors)[]).map(
        (color) => (
          <Box alignItems="center" key={color} mb={25}>
            <Text>{color}</Text>
            <Box size={100} bg={theme.colors[color]} />
          </Box>
        ),
      )}
    </SandBoxItem>
  </ScrollView>
);

export default ColorsSandbox;

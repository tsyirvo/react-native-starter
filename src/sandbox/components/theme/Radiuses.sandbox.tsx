import React from 'react';
import { ScrollView } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
import theme from '$styles/theme';

import SandBoxItem from '../menu/components/SandboxItem';

const RadiusesSandbox = () => (
  <ScrollView>
    <SandBoxItem isSingle>
      {Object.keys(theme.radii).map((radius) => (
        <Box alignItems="center" key={radius} mb={25}>
          <Text>{radius}</Text>
          <Box width={100} height={100} bg="grey" borderRadius={radius} />
        </Box>
      ))}
    </SandBoxItem>
  </ScrollView>
);

export default RadiusesSandbox;

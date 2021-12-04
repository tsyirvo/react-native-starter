import React from 'react';
import { ScrollView } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
import theme from '$styles/theme';

import CenteredContent from '../menu/components/CenteredContent';

const RadiusesSandbox = () => (
  <ScrollView>
    <CenteredContent>
      {Object.keys(theme.radii).map((radius) => (
        <Box alignItems="center" key={radius} mb={25}>
          <Text>{radius}</Text>
          <Box width={100} height={100} bg="grey" borderRadius={radius} />
        </Box>
      ))}
    </CenteredContent>
  </ScrollView>
);

export default RadiusesSandbox;

import React from 'react';
import { ScrollView } from 'react-native';

import { Box, Text } from '$components/shared/primitives';

import CenteredContent from '../menu/components/CenteredContent';

const BoxSandbox = () => (
  <ScrollView>
    <CenteredContent>
      <Text pb="small">Box with a size, color and radiuses</Text>

      <Box size={100} bg="grey" borderRadius="medium" />
    </CenteredContent>

    <CenteredContent>
      <Text pb="small">Box with border props and full width</Text>

      <Box
        width="100%"
        height={50}
        bg="grey"
        borderBottomColor="green"
        borderBottomWidth={4}
      />
    </CenteredContent>

    <CenteredContent>
      <Text pb="small">Box with position props and odd size</Text>

      <Box width={100} height={50} bg="grey" left={50} mb={50} />
    </CenteredContent>
  </ScrollView>
);

export default BoxSandbox;

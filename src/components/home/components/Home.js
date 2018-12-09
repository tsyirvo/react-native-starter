import React from 'react';

import Button from 'shared/Button';
import Box from 'shared/Box';
import Text from 'shared/Text';

const Home = ({ navigation }) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text fontSize={4}>Home Component</Text>

    <Button onPress={() => navigation.navigate('Details')}>
      <Text mt={3}>Go to details</Text>
    </Button>
  </Box>
);

export default Home;

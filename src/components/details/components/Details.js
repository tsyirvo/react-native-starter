import React from 'react';

import Button from 'shared/Button';
import Box from 'shared/Box';
import Text from 'shared/Text';

const Details = ({ navigation }) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text fontSize={4}>Details Component</Text>

    <Button onPress={() => navigation.goBack(null)}>
      <Text mt={3}>Go back</Text>
    </Button>
  </Box>
);

export default Details;

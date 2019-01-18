import React from 'react';

import getTranslations from 'utils/locales';

import Button from 'shared/Button';
import Box from 'shared/Box';
import Text from 'shared/Text';

const Details = ({ navigation }) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text fontSize={4}>{getTranslations('details', 'page_title')}</Text>

    <Button onPress={() => navigation.goBack(null)}>
      <Text mt={3}>{getTranslations('details', 'navigation_back')}</Text>
    </Button>
  </Box>
);

export default Details;

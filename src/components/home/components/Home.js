import React from 'react';

import getTranslations from 'utils/locales';

import Button from 'shared/Button';
import Box from 'shared/Box';
import Text from 'shared/Text';

const Home = ({ navigation }) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text fontSize={4}>{getTranslations('home', 'page_title')}</Text>

    <Button onPress={() => navigation.navigate('Details')}>
      <Text mt={3}>{getTranslations('home', 'navigation_button')}</Text>
    </Button>
  </Box>
);

export default Home;

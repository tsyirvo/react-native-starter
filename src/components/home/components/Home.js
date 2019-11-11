import React from 'react';

import getTranslations from 'utils/locales';

import Button from 'shared/Button';
import Box from 'shared/Box';
import Text from 'shared/Text';

const GITHUB_TOKEN = '';

const Home = ({ navigation }) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text fontSize={4}>{getTranslations('home', 'page_title')}</Text>

    <Button onPress={() => navigation.navigate('Details')}>
      <Text mt={3}>{getTranslations('home', 'navigation_details')}</Text>
    </Button>

    {GITHUB_TOKEN !== '' && (
      <Button onPress={() => navigation.navigate('Github')}>
        <Text mt={3}>{getTranslations('home', 'navigation_github')}</Text>
      </Button>
    )}
  </Box>
);

export default Home;

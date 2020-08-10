import React, { useCallback, ReactElement } from 'react';

import { INavigationTypes } from 'types/navigation.types';

import getTranslations from '@utils/locales';

import Button from '@shared/Button';
import Box from '@shared/Box';
import Text from '@shared/Text';

interface IProps {
  navigation: INavigationTypes;
}

const GITHUB_TOKEN = '';

const Home = ({ navigation }: IProps): ReactElement => {
  const goToDetails = useCallback(() => navigation.navigate('Details'), []);
  const goToGithub = useCallback(() => navigation.navigate('Github'), []);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text testID="home_title" fontSize={4}>
        {getTranslations('home', 'page_title')}
      </Text>

      <Button testID="goto_details" onPress={goToDetails}>
        <Text mt={3}>{getTranslations('home', 'navigation_details')}</Text>
      </Button>

      {GITHUB_TOKEN !== '' && (
        <Button onPress={goToGithub}>
          <Text mt={3}>{getTranslations('home', 'navigation_github')}</Text>
        </Button>
      )}
    </Box>
  );
};

export default Home;

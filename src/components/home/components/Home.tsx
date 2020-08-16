import React, { useCallback, ReactElement } from 'react';

import { INavigationTypes } from 'types/navigation.types';

import getTranslations from '@utils/locales';

import Button from '@shared/Button';
import Box from '@shared/Box';
import Text from '@shared/Text';
import SafeView from '@shared/SafeView';

interface IProps {
  navigation: INavigationTypes;
}

const Home = ({ navigation }: IProps): ReactElement => {
  const goToDetails = useCallback(() => navigation.navigate('Details'), []);

  return (
    <SafeView>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text testID="home_title" fontSize={4}>
          {getTranslations('home', 'page_title')}
        </Text>

        <Button testID="goto_details" onPress={goToDetails}>
          <Text mt={3}>{getTranslations('home', 'navigation_details')}</Text>
        </Button>
      </Box>
    </SafeView>
  );
};

export default Home;

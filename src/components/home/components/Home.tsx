import React, { useCallback, ReactElement } from 'react';

import { HomeScreenNavigationProp } from '@routes/routes.types';
import getTranslations from '@utils/locales';

import Button from '@shared/Button';
import { Flex, Title, Text } from '@shared/primitives';
import SafeView from '@shared/SafeView';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props): ReactElement => {
  const goToDetails = useCallback(() => navigation.navigate('Details'), []);

  return (
    <SafeView>
      <Flex justifyContent="center" alignItems="center">
        <Title testID="home_title" variant="xLarge">
          {getTranslations('home', 'page_title')}
        </Title>

        <Button testID="goto_details" onPress={goToDetails}>
          <Text mt="medium">
            {getTranslations('home', 'navigation_details')}
          </Text>
        </Button>
      </Flex>
    </SafeView>
  );
};

export default Home;

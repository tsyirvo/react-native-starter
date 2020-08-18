import React, { useCallback, ReactElement } from 'react';
import { StatusBar, ScrollView } from 'react-native';

import { HomeScreenNavigationProp } from '@routes/routes.types';
import getTranslations from '@utils/locales';

import Button from '@shared/Button';
import { Flex, Title, Text } from '@shared/primitives';
import SafeView from '@shared/SafeView';

import Header from './Header';
import Informations from './Informations';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props): ReactElement => {
  const goToOtherPage = useCallback(() => navigation.navigate('OtherPage'), []);

  return (
    <SafeView edges={['bottom']}>
      <ScrollView>
        <StatusBar barStyle="light-content" />

        <Header />

        <Flex px={25}>
          <Title fontWeight={600} mt={25}>
            {getTranslations('home', 'navigation_title')}
          </Title>
          <Button testID="goto_otherPage" onPress={goToOtherPage}>
            <Text mt="medium">
              {getTranslations('home', 'navigation_content')}
            </Text>
          </Button>

          <Informations />
        </Flex>
      </ScrollView>
    </SafeView>
  );
};

export default Home;

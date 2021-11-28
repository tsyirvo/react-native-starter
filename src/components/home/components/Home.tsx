import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { Button, Flex, Text, Title } from '$components/shared/primitives';
import SafeView from '$components/shared/SafeView';
import i18n from '$i18n/config';
import { HomeScreenNavigationProp } from '$routes/routes.types';

import Header from './Header';
import Informations from './Informations';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const goToOtherPage = useCallback(
    () => navigation.navigate('OtherPage'),
    [navigation],
  );

  return (
    <SafeView edges={['bottom']}>
      <ScrollView>
        <Header />

        <Flex px="large" pb={150}>
          <Title fontWeight={600} mt="large">
            {i18n.t('home.navigation.title')}
          </Title>
          <Button
            testID="goto_otherPage"
            onPress={goToOtherPage}
            alignItems="center"
            mt="medium"
          >
            <Text>{i18n.t('home.navigation.content')}</Text>
          </Button>

          <Informations />
        </Flex>
      </ScrollView>
    </SafeView>
  );
};

export default Home;

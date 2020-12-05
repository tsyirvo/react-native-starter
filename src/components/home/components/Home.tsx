import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { HomeScreenNavigationProp } from '$routes/routes.types';
import { Flex, Text, Title, Button } from '$shared/primitives';
import SafeView from '$shared/SafeView';

import Header from './Header';
import Informations from './Informations';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const goToOtherPage = useCallback(() => navigation.navigate('OtherPage'), []);

  return (
    <SafeView edges={['bottom']}>
      <ScrollView>
        <Header />

        <Flex px="large" pb={150}>
          <Title fontWeight={600} mt="large">
            {t('home.navigation_title')}
          </Title>
          <Button
            testID="goto_otherPage"
            onPress={goToOtherPage}
            alignItems="center"
            mt="medium"
          >
            <Text>{t('home.navigation_content')}</Text>
          </Button>

          <Informations />
        </Flex>
      </ScrollView>
    </SafeView>
  );
};

export default Home;

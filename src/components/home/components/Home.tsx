import React, { useCallback, ReactElement, useEffect } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { useTranslation } from 'react-i18next';

import { HomeScreenNavigationProp } from '$routes/routes.types';
import Button from '$shared/Button';
import { Flex, Title, Text } from '$shared/primitives';
import SafeView from '$shared/SafeView';

import Header from './Header';
import Informations from './Informations';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props): ReactElement => {
  const { t } = useTranslation();

  const goToOtherPage = useCallback(() => navigation.navigate('OtherPage'), []);

  useEffect(() => {
    analytics().setUserProperties({
      username: 'tsyirvo',
      email: 'tsyirvo@gab.ninja',
    });

    crashlytics().setUserId('123');
    crashlytics().setAttributes({
      username: 'tsyirvo',
      email: 'tsyirvo@gab.ninja',
    });
  }, []);

  return (
    <SafeView edges={['bottom']}>
      <ScrollView>
        <StatusBar barStyle="light-content" />

        <Header />

        <Flex px={25} pb={150}>
          <Title fontWeight={600} mt={25}>
            {t('home.navigation_title')}
          </Title>
          <Button
            testID="goto_otherPage"
            onPress={goToOtherPage}
            bg="grey"
            py={5}
            px={15}
            alignItems="center"
            mt={20}
            borderRadius="medium"
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

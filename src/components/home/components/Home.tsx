import { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
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

        <Box px="global_24" pb="global_32">
          <Text mt="global_32">{i18n.t('home.navigation.title')}</Text>
          {/* <Button
            testID="goto_otherPage"
            onPress={goToOtherPage}
            alignItems="center"
            mt="medium"
          >
            <Text>{i18n.t('home.navigation.content')}</Text>
          </Button> */}

          <Informations />
        </Box>
      </ScrollView>
    </SafeView>
  );
};

export default Home;

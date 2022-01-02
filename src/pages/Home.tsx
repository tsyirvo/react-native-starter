import React from 'react';
import { ScrollView } from 'react-native';

import { Header, Informations, Version } from '$components/home';
import { Box, Button, Text } from '$components/ui/primitives';
import SafeView from '$components/ui/SafeView';
import i18n from '$i18n/config';
import { HomeScreenNavigationProp } from '$navigation/navigation.types';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const goToOtherPage = () => navigation.navigate('OtherPage');

  return (
    <SafeView edges={['bottom']}>
      <ScrollView>
        <Header />

        <Box px="global_24" pb="global_32">
          <Text variant="large" mt="global_32">
            {i18n.t('home.navigation.title')}
          </Text>

          <Box mt="global_8">
            <Button
              testID="goto_otherPage"
              onPress={goToOtherPage}
              alignItems="center"
              label={i18n.t('home.navigation.content')}
            />
          </Box>

          <Informations />
          <Version />
        </Box>
      </ScrollView>
    </SafeView>
  );
};

export default Home;

import React, { useCallback } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { HomeScreenNavigationProp } from '$routes/routes.types';
import Button from '$shared/Button';
import { Flex, Title, Text, Box } from '$shared/primitives';
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
        <StatusBar barStyle="light-content" />

        <Header />

        <Flex px={25} pb={150}>
          <Title fontWeight={600} mt={25}>
            {t('home.navigation_title')}
          </Title>
          <Button testID="goto_otherPage" onPress={goToOtherPage}>
            <Box
              bg="grey"
              py={5}
              px={15}
              alignItems="center"
              mt={20}
              borderRadius="medium"
            >
              <Text>{t('home.navigation_content')}</Text>
            </Box>
          </Button>

          <Informations />
        </Flex>
      </ScrollView>
    </SafeView>
  );
};

export default Home;

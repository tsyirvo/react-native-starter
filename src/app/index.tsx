import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { config } from '$core/constants';
import { Header, Informations, Version } from '$features/home/components';
import { Box, Button, Screen, Text } from '$shared/uiKit';

const HomeScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const goToOtherScreen = () => {
    router.push('/other');
  };

  return (
    <>
      <Stack.Screen options={screenOptions} />

      <Screen>
        <ScrollView>
          <Header />

          <Box pb="spacing_32" px="spacing_16">
            <Text mt="spacing_32" variant="large">
              {t('homeScreen.navigation.title')}
            </Text>

            <Box mt="spacing_8">
              <Button.Text isTextCentered onPress={goToOtherScreen}>
                {t('homeScreen.navigation.content')}
              </Button.Text>
            </Box>

            <Informations />
          </Box>

          <Version />
        </ScrollView>
      </Screen>
    </>
  );
};

const screenOptions = {
  headerShown: false,
};

// eslint-disable-next-line import/no-mutable-exports
let EntryPoint = HomeScreen;

if (config.isStorybookEnabled) {
  // eslint-disable-next-line
  const StorybookUI = require('../../.storybook').default;

  // eslint-disable-next-line
  EntryPoint = () => <StorybookUI />;
}

export default EntryPoint;

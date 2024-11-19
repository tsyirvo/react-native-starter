import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { config } from '$core/constants';
import { Header, Informations, Version } from '$features/home/components';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

const HomeScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const goToOtherScreen = () => {
    router.push('/other');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: t('homeScreen.navigation.screenTitle'),
        }}
      />

      <Screen p="zero">
        <Header />

        <Box pb="spacing_32" px="spacing_16">
          <Text mt="spacing_32" variant="large">
            {t('homeScreen.navigation.title')}
          </Text>

          <Box mt="spacing_8">
            <Button.Text testID="home-navigateCta" onPress={goToOtherScreen}>
              {t('homeScreen.navigation.content')}
            </Button.Text>
          </Box>

          <Informations />
        </Box>

        <Version />
      </Screen>
    </>
  );
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

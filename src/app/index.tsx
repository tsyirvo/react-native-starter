import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Header, Informations, Version } from '$features/home/components';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

const HomeScreen = () => {
  const router = useRouter();
  const { t } = useTranslation('homeScreen');

  const goToOtherScreen = () => {
    router.push('/other');
  };

  return (
    <Screen p="zero">
      <Stack.Screen
        options={{
          headerShown: false,
          title: t('navigation.screenTitle'),
        }}
      />

      <Header />

      <Box pb="spacing_32" px="spacing_16">
        <Text mt="spacing_32" variant="large">
          {t('navigation.title')}
        </Text>

        <Box mt="spacing_8">
          <Button.Text testID="home-navigateCta" onPress={goToOtherScreen}>
            {t('navigation.content')}
          </Button.Text>
        </Box>

        <Informations />
      </Box>

      <Version />
    </Screen>
  );
};

export default HomeScreen;

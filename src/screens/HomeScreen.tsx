import { useTranslation } from 'react-i18next';

import type { HomeScreenNavigationProp } from '$core/navigation/navigation.types';
import { Header, Informations, Version } from '$features/home';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { t } = useTranslation('homeScreen');

  const goToOtherScreen = () => {
    navigation.navigate('OtherScreen');
  };

  return (
    <Screen>
      <Header />

      <Box pb="spacing_32" px="spacing_24">
        <Text mt="spacing_32" variant="large">
          {t('navigation.title')}
        </Text>

        <Box mt="spacing_8">
          <Button.Text testID="goto_otherScreen" onPress={goToOtherScreen}>
            {t('navigation.content')}
          </Button.Text>
        </Box>

        <Informations />
      </Box>

      <Version />
    </Screen>
  );
}

import { useTranslation } from 'react-i18next';

import type { HomeScreenNavigationProp } from '$core/navigation/navigation.types';
import { Header, Informations, Version } from '$features/home';
import { Box, Button, Text } from '$shared/ui/primitives';
import { Screen } from '$shared/ui/Screen';

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

      <Box pb="global_32" px="global_24">
        <Text mt="global_32" variant="large">
          {t('navigation.title')}
        </Text>

        <Box mt="global_8">
          <Button
            alignItems="center"
            label={t('navigation.content')}
            testID="goto_otherScreen"
            onPress={goToOtherScreen}
          />
        </Box>

        <Informations />

        <Version />
      </Box>
    </Screen>
  );
}

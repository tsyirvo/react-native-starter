import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Header, Informations, Version } from '$features/home';
import { Screen } from '$shared/components';
import { Box } from '$shared/uiKit';

const HomeTabScreen = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('tabs.home') }} />

      <Screen>
        <ScrollView>
          <Header />

          <Box pb="spacing_32" pt="spacing_24" px="spacing_16">
            <Informations />
          </Box>

          <Version />
        </ScrollView>
      </Screen>
    </>
  );
};

export default HomeTabScreen;

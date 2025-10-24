import { Stack as RouterStack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Header, Informations, Version } from '$features/home';
import { Screen } from '$shared/components';
import { Stack } from '$shared/uiKit';

const HomeTabScreen = () => {
  const { t } = useTranslation();

  return (
    <>
      <RouterStack.Screen options={{ title: t('tabs.home') }} />

      <Screen>
        <ScrollView>
          <Header />

          <Stack pb="spacing_32" pt="spacing_24" px="spacing_16">
            <Informations />
          </Stack>

          <Version />
        </ScrollView>
      </Screen>
    </>
  );
};

export default HomeTabScreen;

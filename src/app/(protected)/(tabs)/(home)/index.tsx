import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Header, Informations, Version } from '$features/home';
import { Screen } from '$shared/components';
import { ScreenTitle, Stack } from '$shared/uiKit';

const HomeTabScreen = () => {
  const { t } = useTranslation();

  return (
    <>
      <ScreenTitle isLarge title={t('tabs.home')} />

      <Screen>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
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

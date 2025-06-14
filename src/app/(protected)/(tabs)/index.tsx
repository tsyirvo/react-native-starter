import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { config } from '$domain/constants';
import { Header, Informations, Version } from '$features/home';
import { Box, Screen } from '$shared/uiKit';

const HomeTabScreen = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{ title: t('homeScreen.navigation.screenTitle') }}
      />

      <Screen>
        <ScrollView>
          <Header />

          <Box pb="spacing_32" px="spacing_16">
            <Informations />
          </Box>

          <Version />
        </ScrollView>
      </Screen>
    </>
  );
};

// eslint-disable-next-line import/no-mutable-exports
let EntryPoint = HomeTabScreen;

if (config.isStorybookEnabled) {
  // eslint-disable-next-line
  const StorybookUI = require('../../../../.storybook').default;

  // eslint-disable-next-line
  EntryPoint = () => <StorybookUI />;
}

export default EntryPoint;

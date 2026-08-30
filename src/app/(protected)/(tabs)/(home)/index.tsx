import { ScrollView } from 'react-native';

import { Header, Informations, Version } from '$features/home';
import { Screen } from '$shared/components';
import { Stack } from '$shared/uiKit';

const HomeTabScreen = () => (
  <Screen edges={['top']}>
    <ScrollView>
      <Header />

      <Stack pb="spacing_32" pt="spacing_24" px="spacing_16">
        <Informations />
      </Stack>

      <Version />
    </ScrollView>
  </Screen>
);

export default HomeTabScreen;

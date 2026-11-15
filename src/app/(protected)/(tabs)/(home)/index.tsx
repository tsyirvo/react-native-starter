import { Header, Informations, Version } from '$features/home';
import { Screen, ScreenScrollView } from '$shared/components';
import { Stack } from '$shared/uiKit/primitives';

const HomeTabScreen = () => (
  <Screen>
    <ScreenScrollView>
      <Header />

      <Stack pb="spacing_32" pt="spacing_24" px="spacing_16">
        <Informations />
      </Stack>

      <Version />
    </ScreenScrollView>
  </Screen>
);

export default HomeTabScreen;

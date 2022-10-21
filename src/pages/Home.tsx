import { Header, Informations, Version } from '$components/home';
import { Box, Button, Text } from '$components/ui/primitives';
import Screen from '$components/ui/Screen';
import i18n from '$i18n/config';
import { HomeScreenNavigationProp } from '$navigation/navigation.types';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const goToOtherPage = () => navigation.navigate('OtherPage');

  return (
    <Screen>
      <Header />

      <Box pb="global_32" px="global_24">
        <Text mt="global_32" variant="large">
          {i18n.t('home.navigation.title')}
        </Text>

        <Box mt="global_8">
          <Button
            alignItems="center"
            label={i18n.t('home.navigation.content')}
            testID="goto_otherPage"
            onPress={goToOtherPage}
          />
        </Box>

        <Informations />

        <Version />
      </Box>
    </Screen>
  );
};

export default Home;

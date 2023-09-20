import { useTranslation } from 'react-i18next';

import { Header, Informations, Version } from '$components/home';
import { Box, Button, Text } from '$components/ui/primitives';
import Screen from '$components/ui/Screen';
import { config } from '$core/constants';
import { HomeScreenNavigationProp } from '$navigation/navigation.types';

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: HomeProps) => {
  const { t } = useTranslation('homeScreen');

  const goToOtherPage = () => navigation.navigate('OtherPage');

  console.log('config', config);

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

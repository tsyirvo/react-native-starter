import { Box, Button, Text } from '$components/ui/primitives';
import Screen from '$components/ui/Screen';
import i18n from '$i18n/config';
import { OtherPageScreenNavigationProp } from '$navigation/navigation.types';

type Props = {
  navigation: OtherPageScreenNavigationProp;
};

const OtherPage = ({ navigation }: Props) => {
  const goBack = () => navigation.goBack();

  return (
    <Screen>
      <Box alignItems="center" justifyContent="center" mt="global_16">
        <Text testID="otherPage_title" variant="large">
          {i18n.t('otherPage.navigation.title')}
        </Text>

        <Box mt="global_24">
          <Button
            alignItems="center"
            label={i18n.t('otherPage.navigation.backCta')}
            testID="back_button"
            onPress={goBack}
          />
        </Box>
      </Box>
    </Screen>
  );
};

export default OtherPage;

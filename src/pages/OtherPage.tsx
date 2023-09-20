import { useTranslation } from 'react-i18next';

import { Box, Button, Text } from '$components/ui/primitives';
import Screen from '$components/ui/Screen';
import { OtherPageScreenNavigationProp } from '$navigation/navigation.types';

type Props = {
  navigation: OtherPageScreenNavigationProp;
};

const OtherPage = ({ navigation }: Props) => {
  const { t } = useTranslation('otherScreen');

  const goBack = () => navigation.goBack();

  return (
    <Screen>
      <Box alignItems="center" justifyContent="center" mt="global_16">
        <Text testID="otherPage_title" variant="large">
          {t('navigation.title')}
        </Text>

        <Box mt="global_24">
          <Button
            alignItems="center"
            label={t('navigation.backCta')}
            testID="back_button"
            onPress={goBack}
          />
        </Box>
      </Box>
    </Screen>
  );
};

export default OtherPage;

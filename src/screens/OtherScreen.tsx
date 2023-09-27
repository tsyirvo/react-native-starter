import { useTranslation } from 'react-i18next';

import type { OtherScreenNavigationProp } from '$core/navigation/navigation.types';
import { Box, Button, Text } from '$shared/ui/primitives';
import { Screen } from '$shared/ui/Screen';

type OtherScreenProps = {
  navigation: OtherScreenNavigationProp;
};

export function OtherScreen({ navigation }: OtherScreenProps) {
  const { t } = useTranslation('otherScreen');

  const goBack = () => {
    navigation.goBack();
  };

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
}

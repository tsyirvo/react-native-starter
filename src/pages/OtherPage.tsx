import { useCallback } from 'react';

import { Box, Button, Text } from '$components/ui/primitives';
import SafeView from '$components/ui/SafeView';
import i18n from '$i18n/config';
import { OtherPageScreenNavigationProp } from '$navigation/navigation.types';

type Props = {
  navigation: OtherPageScreenNavigationProp;
};

const OtherPage = ({ navigation }: Props) => {
  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <SafeView>
      <Box alignItems="center" justifyContent="center">
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
    </SafeView>
  );
};

export default OtherPage;

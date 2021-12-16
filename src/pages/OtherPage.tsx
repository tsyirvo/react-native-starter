import { useCallback } from 'react';

import { Box, Button, Text } from '$components/shared/primitives';
import SafeView from '$components/shared/SafeView';
import i18n from '$i18n/config';
import { OtherPageScreenNavigationProp } from '$navigation/navigation.types';

type Props = {
  navigation: OtherPageScreenNavigationProp;
};

const OtherPage = ({ navigation }: Props) => {
  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <SafeView>
      <Box justifyContent="center" alignItems="center">
        <Text testID="otherPage_title" variant="large">
          {i18n.t('otherPage.navigation.title')}
        </Text>

        <Box mt="global_24">
          <Button
            alignItems="center"
            testID="back_button"
            onPress={goBack}
            label={i18n.t('otherPage.navigation.backCta')}
          />
        </Box>
      </Box>
    </SafeView>
  );
};

export default OtherPage;

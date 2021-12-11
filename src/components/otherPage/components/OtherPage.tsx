import { useCallback } from 'react';

import { Box, Text } from '$components/shared/primitives';
import SafeView from '$components/shared/SafeView';
import i18n from '$i18n/config';
import { OtherPageScreenNavigationProp } from '$routes/routes.types';

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

        {/* <Button
          alignItems="center"
          mt="medium"
          testID="back_button"
          onPress={goBack}
        >
          <Text>{i18n.t('otherPage.navigation.backCta')}</Text>
        </Button> */}
      </Box>
    </SafeView>
  );
};

export default OtherPage;

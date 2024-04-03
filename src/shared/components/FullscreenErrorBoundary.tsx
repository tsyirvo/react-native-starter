import * as Updates from 'expo-updates';
import { useTranslation } from 'react-i18next';

import { ErrorMonitoring } from '$core/monitoring';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';
import { SafeView } from '$shared/uiKit/SafeView';

function FullscreenErrorBoundary() {
  const { t } = useTranslation('miscScreens');

  const reloadApp = async () =>
    Updates.reloadAsync().catch((error: unknown) => {
      ErrorMonitoring.exception(error);
    });

  return (
    <SafeView>
      <Box
        alignItems="center"
        alignSelf="center"
        flex={1}
        justifyContent="center"
        width="80%"
      >
        <Text mb="spacing_8" variant="large">
          {t('errorBoundary.title')}
        </Text>

        <Text textAlign="center" variant="medium">
          {t('errorBoundary.description')}
        </Text>

        <Box mt="spacing_32">
          <Button.Text onPress={reloadApp}>
            {t('errorBoundary.cta')}
          </Button.Text>
        </Box>
      </Box>
    </SafeView>
  );
}

export { FullscreenErrorBoundary };

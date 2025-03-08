import * as Updates from 'expo-updates';
import { useTranslation } from 'react-i18next';

import { ErrorMonitoring } from '$core/monitoring';
import { Box, Button, Text } from '$shared/uiKit';

const FullscreenErrorBoundary = () => {
  const { t } = useTranslation();

  const reloadApp = async () =>
    Updates.reloadAsync().catch((error: unknown) => {
      ErrorMonitoring.exception(error);
    });

  return (
    <Box
      alignItems="center"
      alignSelf="center"
      bg="bg"
      height="100%"
      justifyContent="center"
      px="spacing_24"
      width="100%"
    >
      <Text mb="spacing_8" variant="large">
        {t('miscScreens.errorBoundary.title')}
      </Text>

      <Text textAlign="center" variant="medium">
        {t('miscScreens.errorBoundary.description')}
      </Text>

      <Box mt="spacing_32">
        <Button.Text onPress={reloadApp}>
          {t('miscScreens.errorBoundary.cta')}
        </Button.Text>
      </Box>
    </Box>
  );
};

export { FullscreenErrorBoundary };

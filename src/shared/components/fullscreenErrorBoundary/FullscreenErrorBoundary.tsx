import * as Updates from 'expo-updates';
import { useTranslation } from 'react-i18next';

import { ErrorMonitoring } from '$infra/monitoring';
import { Box, Button, Text } from '$shared/uiKit';

export const FullscreenErrorBoundary = () => {
  const { t } = useTranslation();

  const reloadApp = async () =>
    Updates.reloadAsync().catch((error: unknown) => {
      ErrorMonitoring.exception(error);
    });

  return (
    <Box
      alignItems="center"
      alignSelf="center"
      bg="bg_base"
      height="100%"
      justifyContent="center"
      px="spacing_24"
      width="100%"
    >
      <Text mb="spacing_8" variant="large">
        {t('errorBoundary.title')}
      </Text>

      <Text textAlign="center" variant="medium">
        {t('errorBoundary.description')}
      </Text>

      <Box mt="spacing_32">
        <Button.Text onPress={reloadApp}>{t('errorBoundary.cta')}</Button.Text>
      </Box>
    </Box>
  );
};

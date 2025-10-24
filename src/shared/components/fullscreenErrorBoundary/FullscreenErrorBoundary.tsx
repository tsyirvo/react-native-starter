import * as Updates from 'expo-updates';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

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
      <Box mb="spacing_8">
        <Text variant="large">{t('errorBoundary.title')}</Text>
      </Box>

      <Text style={styles.centeredText} variant="medium">
        {t('errorBoundary.description')}
      </Text>

      <Box mt="spacing_32">
        <Button.Text onPress={reloadApp}>{t('errorBoundary.cta')}</Button.Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
});

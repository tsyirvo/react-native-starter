import * as Updates from 'expo-updates';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { ErrorMonitoring } from '$infra/monitoring';
import { Button, Box, Stack, Text } from '$shared/uiKit';

export const FullscreenErrorBoundary = () => {
  const { t } = useTranslation();

  const reloadApp = async () =>
    Updates.reloadAsync().catch((error: unknown) => {
      ErrorMonitoring.exception(error);
    });

  return (
    <Box
      align="center"
      self="center"
      justify="center"
      px="spacing_24"
      style={styles.container}
    >
      <Stack mb="spacing_8">
        <Text variant="large">{t('errorBoundary.title')}</Text>
      </Stack>

      <Text style={styles.centeredText} variant="medium">
        {t('errorBoundary.description')}
      </Text>

      <Stack mt="spacing_32">
        <Button.Text onPress={reloadApp}>{t('errorBoundary.cta')}</Button.Text>
      </Stack>
    </Box>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.bg_base,
    width: '100%',
    height: '100%',
  },
  centeredText: {
    textAlign: 'center',
  },
}));

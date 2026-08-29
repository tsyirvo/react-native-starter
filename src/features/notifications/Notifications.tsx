import { useTranslation } from 'react-i18next';

import { Logger } from '$infra/logger';
import { useRequestPermission } from '$shared/hooks';
import { Box, Button, Text } from '$shared/uiKit';

export const Notifications = () => {
  const { t } = useTranslation();

  const { requestNotificationPermission } = useRequestPermission();

  const onPress = async () => {
    try {
      await requestNotificationPermission();
    } catch (error) {
      Logger.error({
        error,
        level: 'warning',
        message: 'Failed to request notification permission',
      });
    }
  };

  return (
    <>
      <Text variant="large">
        {t('featuresScreen.notificationsPermission.title')}
      </Text>

      <Box mt="spacing_8" self="flex-start">
        <Button.Text onPress={onPress}>
          {t('featuresScreen.notificationsPermission.cta')}
        </Button.Text>
      </Box>
    </>
  );
};

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
        message: 'Failed to request notification permission',
        level: 'warning',
      });
    }
  };

  return (
    <>
      <Text variant="large">
        {t('featuresScreen.notificationsPermission.title')}
      </Text>

      <Box self="flex-start" mt="spacing_8">
        <Button.Text onPress={onPress}>
          {t('featuresScreen.notificationsPermission.cta')}
        </Button.Text>
      </Box>
    </>
  );
};

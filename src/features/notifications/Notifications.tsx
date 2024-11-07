import React from 'react';
import { useTranslation } from 'react-i18next';

import { Logger } from '$core/logger';
import { useRequestPermission } from '$shared/hooks';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';

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
      <Text variant="large">{t('miscScreens.notifications.title')}</Text>

      <Box alignItems="flex-start" mt="spacing_8">
        <Button.Text onPress={onPress}>
          {t('miscScreens.notifications.cta')}
        </Button.Text>
      </Box>
    </>
  );
};

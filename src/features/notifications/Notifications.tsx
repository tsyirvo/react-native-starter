import * as Linking from 'expo-linking';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import { Logger } from '$core/logger';
import { Notifications as NotificationsHandler } from '$core/notifications';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';

export const Notifications = () => {
  const { t } = useTranslation('miscScreens');

  const requestNotificationPermission = async () => {
    const canRequestPermission =
      await NotificationsHandler.canRequestPermission();
    const isPermissionAlreadyGranted =
      await NotificationsHandler.checkPermissions();

    if (!canRequestPermission && !isPermissionAlreadyGranted) {
      Linking.openSettings().catch((error: unknown) => {
        Logger.error({
          error,
          level: 'warning',
          message: 'Failed to open settings',
        });
      });

      return;
    }

    if (isPermissionAlreadyGranted) {
      Alert.alert('Permission already granted');

      return;
    }

    await NotificationsHandler.requestPermissions();
  };

  return (
    <>
      <Text variant="large">{t('notifications.title')}</Text>

      <Box alignItems="flex-start" mt="spacing_8">
        <Button.Text onPress={requestNotificationPermission}>
          {t('notifications.cta')}
        </Button.Text>
      </Box>
    </>
  );
};

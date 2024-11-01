import { t } from 'i18next';
import type { Permission } from 'react-native-permissions';

import { Logger } from '$core/logger';
import { Permissions } from '$core/permissions';
import { Toaster } from '$core/toaster';

export const useRequestPermission = () => {
  const requestPermission = async (permission: Permission) => {
    const {
      isAvailable,
      isGranted: isInitiallyGranted,
      isRequestable,
    } = await Permissions.checkStatus(permission);

    if (!isAvailable) {
      Logger.dev('Permission is not available');
      Toaster.show({
        type: 'error',
        text1: t('permissions.notAvailable', { ns: 'settings' }),
      });

      return;
    }

    if (isRequestable) {
      const { isGranted } = await Permissions.request(permission);

      if (isGranted) {
        Logger.dev('Permission granted');

        return;
      }

      Logger.dev('Permission refused');
      Toaster.show({
        type: 'error',
        text1: t('permissions.notGranted', { ns: 'settings' }),
      });

      return;
    }

    if (isInitiallyGranted) {
      Logger.dev('Notifications granted');

      return;
    }

    Logger.dev('Notifications not granted');
    Toaster.show({
      type: 'error',
      text1: t('permissions.notGranted', { ns: 'settings' }),
    });
  };

  const requestNotificationPermission = async () => {
    const {
      isAvailable,
      isGranted: isInitiallyGranted,
      isRequestable,
    } = await Permissions.checkNotificationsStatus();

    if (!isAvailable) {
      Logger.dev('Notifications are not available');
      Toaster.show({
        type: 'error',
        text1: t('permissions.notAvailable', { ns: 'settings' }),
      });

      return;
    }

    if (isRequestable) {
      const { isGranted } = await Permissions.requestNotifications();

      if (isGranted) {
        Logger.dev('Notifications granted');

        return;
      }

      Logger.dev('Notifications refused');
      Toaster.show({
        type: 'error',
        text1: t('permissions.notGranted', { ns: 'settings' }),
      });

      return;
    }

    if (isInitiallyGranted) {
      Logger.dev('Notifications granted');

      return;
    }

    Logger.dev('Notifications not granted');
    Toaster.show({
      type: 'error',
      text1: t('permissions.notGranted', { ns: 'settings' }),
    });
  };

  return { requestPermission, requestNotificationPermission };
};

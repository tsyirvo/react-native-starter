import { t } from 'i18next';
import type { Permission } from 'react-native-permissions';

import { Logger } from '$infra/logger';
import { Permissions } from '$infra/permissions';
import { Toaster } from '$infra/toaster';

export const useRequestPermission = () => {
  const permissionGrantedToast = () => {
    Toaster.show({
      type: 'success',
      text1: t('featuresScreen.notificationsPermission.success'),
    });
  };

  const permissionAlreadyGrantedToast = () => {
    Toaster.show({
      type: 'success',
      text1: t('featuresScreen.notificationsPermission.alreadyGranted'),
    });
  };

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
        text1: t('appConfig.permissions.notAvailable'),
      });

      return;
    }

    if (isRequestable) {
      const { isGranted } = await Permissions.request(permission);

      if (isGranted) {
        Logger.dev('Permission granted');
        permissionGrantedToast();

        return;
      }

      Logger.dev('Permission refused');
      Toaster.show({
        type: 'error',
        text1: t('appConfig.permissions.notGranted'),
      });

      return;
    }

    if (isInitiallyGranted) {
      Logger.dev('Notifications granted');
      permissionAlreadyGrantedToast();

      return;
    }

    Logger.dev('Notifications not granted');
    Toaster.show({
      type: 'error',
      text1: t('appConfig.permissions.notGranted'),
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
        text1: t('appConfig.permissions.notAvailable'),
      });

      return;
    }

    if (isRequestable) {
      const { isGranted } = await Permissions.requestNotifications();

      if (isGranted) {
        Logger.dev('Notifications granted');
        permissionGrantedToast();

        return;
      }

      Logger.dev('Notifications refused');
      Toaster.show({
        type: 'error',
        text1: t('appConfig.permissions.notGranted'),
      });

      return;
    }

    if (isInitiallyGranted) {
      Logger.dev('Notifications granted');
      permissionAlreadyGrantedToast();

      return;
    }

    Logger.dev('Notifications not granted');
    Toaster.show({
      type: 'error',
      text1: t('appConfig.permissions.notGranted'),
    });
  };

  return { requestPermission, requestNotificationPermission };
};

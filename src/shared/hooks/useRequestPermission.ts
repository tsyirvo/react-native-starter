import { t } from 'i18next';
import type { Permission } from 'react-native-permissions';

import { Logger } from '$infra/logger';
import { Permissions } from '$infra/permissions';
import { Toaster } from '$infra/toaster';

export const useRequestPermission = () => {
  const permissionGrantedToast = () => {
    Toaster.show({
      text1: t('featuresScreen.notificationsPermission.success'),
      type: 'success',
    });
  };

  const permissionAlreadyGrantedToast = () => {
    Toaster.show({
      text1: t('featuresScreen.notificationsPermission.alreadyGranted'),
      type: 'success',
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
        text1: t('appConfig.permissions.notAvailable'),
        type: 'error',
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
        text1: t('appConfig.permissions.notGranted'),
        type: 'error',
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
      text1: t('appConfig.permissions.notGranted'),
      type: 'error',
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
        text1: t('appConfig.permissions.notAvailable'),
        type: 'error',
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
        text1: t('appConfig.permissions.notGranted'),
        type: 'error',
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
      text1: t('appConfig.permissions.notGranted'),
      type: 'error',
    });
  };

  return { requestNotificationPermission, requestPermission };
};

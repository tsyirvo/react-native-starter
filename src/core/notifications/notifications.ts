import { OneSignal } from 'react-native-onesignal';

import { config } from '$core/constants';
import { Logger } from '$core/logger';

class NotificationsClass {
  /* ***** *****  Setup  ***** ***** */

  init() {
    OneSignal.initialize(config.oneSignalAppId);

    this.watchForNotificationPress();
  }

  /* ***** *****  User  ***** ***** */

  setUser(userId: string) {
    OneSignal.login(userId);
  }

  removeUser() {
    OneSignal.logout();
  }

  setUserEmail(email: string) {
    OneSignal.User.addEmail(email);
  }

  removeUserEmail(email: string) {
    OneSignal.User.removeEmail(email);
  }

  setUserLanguage(language: string) {
    OneSignal.User.setLanguage(language);
  }

  addTag(key: string, value: string) {
    OneSignal.User.addTag(key, value);
  }

  removeTag(key: string) {
    OneSignal.User.removeTag(key);
  }

  /* ***** *****  Status  ***** ***** */

  optOut() {
    OneSignal.User.pushSubscription.optOut();
  }

  optIn() {
    OneSignal.User.pushSubscription.optIn();
  }

  /* ***** *****  Permission  ***** ***** */

  async checkPermissions() {
    const isPermissionGranted =
      await OneSignal.Notifications.getPermissionAsync();

    return isPermissionGranted;
  }

  async canRequestPermission() {
    const isRequestPossible =
      await OneSignal.Notifications.canRequestPermission();

    return isRequestPossible;
  }

  async requestPermissions() {
    const isPermissionGranted =
      await OneSignal.Notifications.requestPermission(false);

    return isPermissionGranted;
  }

  /* ***** *****  Listeners  ***** ***** */

  watchForNotificationPress() {
    OneSignal.Notifications.addEventListener('click', (event) => {
      Logger.dev('OneSignal: notification clicked:', event);
    });
  }
}

export const Notifications = new NotificationsClass();

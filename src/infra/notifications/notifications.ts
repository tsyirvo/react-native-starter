import type { NotificationClickEvent } from 'react-native-onesignal';
import { OneSignal } from 'react-native-onesignal';

import { config } from '$domain/constants';
import { Logger } from '$infra/logger';

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

  /* ***** *****  Listeners  ***** ***** */

  watchForNotificationPress() {
    OneSignal.Notifications.addEventListener(
      'click',
      (event: NotificationClickEvent) => {
        Logger.dev('OneSignal: notification clicked:', event);
      },
    );
  }
}

export const Notifications = new NotificationsClass();

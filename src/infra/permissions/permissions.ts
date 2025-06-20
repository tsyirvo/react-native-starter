import type { Permission, PermissionStatus } from 'react-native-permissions';
import {
  RESULTS,
  check,
  checkNotifications,
  openSettings,
  requestNotifications,
  request as requestPermission,
} from 'react-native-permissions';

class PermissionsClass {
  /* ***** *****  Utils  ***** ***** */

  decodeStatus(status: PermissionStatus) {
    switch (status) {
      case RESULTS.UNAVAILABLE:
        return { isAvailable: false, isGranted: false, isRequestable: false };
      case RESULTS.DENIED:
        return { isAvailable: true, isGranted: false, isRequestable: true };
      case RESULTS.BLOCKED:
        // Is never returned on Android. A call to request will return it
        return { isAvailable: true, isGranted: false, isRequestable: false };
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        return { isAvailable: true, isGranted: true, isRequestable: false };
      default:
        return { isAvailable: false, isGranted: false, isRequestable: false };
    }
  }

  async openSystemSettings(type?: 'application' | 'alarms' | 'notifications') {
    await openSettings(type);
  }

  /* ***** *****  Permissions  ***** ***** */

  async checkStatus(permission: Permission) {
    const status = await check(permission);

    return this.decodeStatus(status);
  }

  async request(permission: Permission) {
    const requestStatus = await requestPermission(permission);

    return this.decodeStatus(requestStatus);
  }

  /* ***** *****  Notifications  ***** ***** */

  async checkNotificationsStatus() {
    const { status } = await checkNotifications();

    return this.decodeStatus(status);
  }

  async requestNotifications() {
    const { status } = await requestNotifications(['alert', 'badge', 'sound']);

    return this.decodeStatus(status);
  }
}

export const Permissions = new PermissionsClass();

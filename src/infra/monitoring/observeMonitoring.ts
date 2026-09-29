import { Observe } from 'expo-observe';

export { ObserveInteractiveMarker as ScreenInteractiveMarker } from 'expo-observe';

class ObserveMonitoringClass {
  init() {
    Observe.configure({
      integrations: {
        'expo-router': {
          filteredParams: [
            'access_token',
            'code',
            'email',
            'password',
            'refresh_token',
            'state',
            'token',
          ],
        },
      },
    });
  }
}

export const ObserveMonitoring = new ObserveMonitoringClass();

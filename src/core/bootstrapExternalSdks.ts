import { Logger } from '$core/logger';

import { Analytics } from './analytics';
import { initDateLocale } from './date';
import { getSupportedDateLocale } from './i18n';
import { ErrorMonitoring } from './monitoring';
import { Notifications } from './notifications';

const initAnalytics = () => {
  Analytics.init().catch((error: unknown) => {
    Logger.error({
      error,
      message: 'Failed to initialize MixPanel',
    });
  });
};

const initNotifications = () => {
  Notifications.init();
};

const initDateLib = () => {
  const localeToUse = getSupportedDateLocale();

  initDateLocale(localeToUse);
};

export const bootstrapExternalSdks = () => {
  ErrorMonitoring.init();
  initAnalytics();
  initNotifications();
  initDateLib();
};

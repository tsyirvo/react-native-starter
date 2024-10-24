import { Logger } from '$core/logger';

import { Analytics } from './analytics';
import { initDateLocale } from './date';
import { getSupportedDateLocale } from './i18n';
import { getSavedAppLocale } from './i18n/utils/languageDetector';
import { ErrorMonitoring } from './monitoring';
import { Notifications } from './notifications';
import { Purchase } from './purchase';

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

  const locale = getSavedAppLocale();

  if (locale) Notifications.setUserLanguage(locale);
};

const initDateLib = () => {
  const localeToUse = getSupportedDateLocale();

  initDateLocale(localeToUse);
};

export const bootstrapExternalSdks = () => {
  ErrorMonitoring.init();
  Purchase.init();
  initAnalytics();
  initNotifications();
  initDateLib();
};

import { Attribution } from '../attribution';
import { initDateLocale } from '../date';
import { getSupportedLocale } from '../i18n';
import { Notifications } from '../notifications';
import { Purchase } from '../purchase';

const initNotifications = (locale: string) => {
  Notifications.init();
  Notifications.setUserLanguage(locale);
};

const initDateLib = (locale: string) => {
  initDateLocale(locale);
};

export const bootstrapApp = async () => {
  // Core services to init first in a specific order
  await Attribution.init();

  // Misc
  const localeToUse = getSupportedLocale();

  // All other core services
  initNotifications(localeToUse);
  initDateLib(localeToUse);

  // Used SDKs
  Purchase.init();
};

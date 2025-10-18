import { Analytics } from '$infra/analytics';

import { getSupportedLocale } from '../i18n';
import { Notifications } from '../notifications';
import { Purchase } from '../purchase';

const initNotifications = (locale: string) => {
  Notifications.init();
  Notifications.setUserLanguage(locale);
};

const initAnalytics = (locale: string) => {
  Analytics.setUserProperty('language', locale);
};

export const bootstrapApp = () => {
  // Misc
  const localeToUse = getSupportedLocale();

  // All other core services
  initNotifications(localeToUse);
  initAnalytics(localeToUse);

  // Used SDKs
  Purchase.init();
};

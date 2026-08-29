import { Analytics } from '$infra/analytics';

import { getSupportedLocale } from '../i18n';
import { Purchase } from '../purchase';

const initAnalytics = (locale: string) => {
  Analytics.setUserProperty('language', locale);
};

export const bootstrapApp = () => {
  // Misc
  const localeToUse = getSupportedLocale();

  // All other core services
  initAnalytics(localeToUse);

  // Used SDKs
  Purchase.init();
};

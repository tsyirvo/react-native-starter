import { Logger } from '$core/logger';

import { Analytics } from './analytics';
import { initDateLocale } from './date';
import { getSupportedDateLocale } from './i18n';
import { ErrorMonitoring } from './monitoring';

const initAnalytics = () => {
  Analytics.init().catch((error: unknown) => {
    Logger.error({
      error,
      message: 'Failed to initialize MixPanel',
    });
  });
};

const initDateLib = () => {
  const localeToUse = getSupportedDateLocale();

  initDateLocale(localeToUse);
};

export const bootstrapExternalSdks = () => {
  initAnalytics();

  ErrorMonitoring.init();

  initDateLib();
};

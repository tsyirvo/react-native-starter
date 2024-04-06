import { FeatureFlags } from '$core/featureFlags';
import { Logger } from '$core/logger';

import { Analytics } from './analytics';
import { initDateLocale } from './date';
import { getSupportedDateLocale } from './i18n';
import { ErrorMonitoring } from './monitoring';

const initFeatureFlags = () => {
  FeatureFlags.init().catch((error: unknown) => {
    Logger.error({
      error,
      message: 'Failed to initialize Flagsmith',
    });
  });
};

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
  initFeatureFlags();
  initAnalytics();

  ErrorMonitoring.init();

  initDateLib();
};

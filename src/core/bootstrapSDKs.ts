import { FeatureFlags } from '$core/featureFlags';
import { Logger } from '$core/logger';

import { Analytics } from './Analytics';
import { initDateLocale } from './date';
import { getSupportedDateLocale } from './i18n';
import { ErrorMonitoring } from './monitoring';

const initFeatureFlags = () => {
  FeatureFlags.init().catch((error: Error) => {
    Logger.error({
      error,
      message: 'Failed to initialize Flagsmith',
    });
  });
};

const initAnalytics = () => {
  Analytics.init().catch((error: Error) => {
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

export const bootstrapSDKs = () => {
  initFeatureFlags();
  initAnalytics();

  ErrorMonitoring.init();

  initDateLib();
};

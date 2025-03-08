import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import { bootstrapExternalSdks } from '$core/bootstrapExternalSdks';
import { Logger } from '$core/logger';
import { checkForOtaUpdate } from '$shared/utils';

SplashScreen.preventAutoHideAsync().catch((error: unknown) => {
  Logger.error({
    message: 'Failed to persist the SplashScreen',
    error,
  });
});

SplashScreen.setOptions({
  duration: 250,
  fade: true,
});

export const useBootstrapApp = () => {
  const onLayoutRootView = useCallback(() => {
    (async () => {
      await bootstrapExternalSdks();
      await checkForOtaUpdate();
    })()
      .finally(SplashScreen.hide)
      .catch((error: unknown) => {
        Logger.error({
          message: 'Failed to bootstrap app SDKs or check for OTA update',
          error,
        });
      });
  }, []);

  return {
    onLayoutRootView,
  };
};

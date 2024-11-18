import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import { bootstrapExternalSdks } from '$core/bootstrapExternalSdks';
import { Logger } from '$core/logger';
import { checkForOtaUpdate } from '$shared/utils/checkForAppUpdates';

SplashScreen.preventAutoHideAsync().catch((error: unknown) => {
  Logger.error({
    message: 'Failed to persist the SplashScreen',
    error,
  });
});

export const useBootstrapApp = () => {
  const onLayoutRootView = useCallback(() => {
    (async () => {
      await bootstrapExternalSdks();
      await checkForOtaUpdate();
    })()
      .finally(() => {
        SplashScreen.hideAsync().catch((error: unknown) => {
          Logger.error({
            message: 'Failed to hide the SplashScreen',
            error,
          });
        });
      })
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

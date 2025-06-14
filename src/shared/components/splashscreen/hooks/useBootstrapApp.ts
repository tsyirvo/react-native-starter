import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';

import { bootstrapApp } from '$infra/bootstrap';
import { Logger } from '$infra/logger';
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
  const [isAppReady, setIsAppReady] = useState(false);

  const onLayoutRootView = useCallback(() => {
    (async () => {
      await bootstrapApp();
      await checkForOtaUpdate();

      // TODO(prod): add necessary bootstrap logic here
      setIsAppReady(true);
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
    isAppReady,
    onLayoutRootView,
  };
};

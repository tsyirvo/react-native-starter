import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

import { bootstrapApp } from '$infra/bootstrap';
import { Logger } from '$infra/logger';
import { useAppStore } from '$infra/store';
import { useGetSessionState } from '$shared/hooks';
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
  const [isBootstrappingInfra, setIsBootstrappingInfra] = useState(true);

  const isBootstrappingApplication = useAppStore(
    (state) => state.isBootstrappingApplication,
  );

  const isAppReady = !isBootstrappingInfra && !isBootstrappingApplication;

  useGetSessionState();

  const onLayoutRootView = useCallback(() => {
    (async () => {
      await bootstrapApp();
      await checkForOtaUpdate();

      // TODO(prod): add necessary bootstrap logic here
      setIsBootstrappingInfra(false);
    })().catch((error: unknown) => {
      Logger.error({
        message: 'Failed to bootstrap app SDKs or check for OTA update',
        error,
      });
    });
  }, []);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hide();
    }
  }, [isAppReady]);

  return {
    isAppReady,
    onLayoutRootView,
  };
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import { Logger } from '$core/logger';
import { checkForOtaUpdate } from '$shared/utils/checkForAppUpdates';

SplashScreen.preventAutoHideAsync().catch((error: unknown) => {
  Logger.error({
    message: 'Failed to persist the SplashScreen',
    error,
  });
});

export const useLoadAssets = () => {
  const onLayoutRootView = useCallback(() => {
    (async () => {
      await checkForOtaUpdate();
      await SplashScreen.hideAsync();
    })().catch((error: unknown) => {
      Logger.error({
        message: 'Failed to hide the SplashScreen',
        error,
      });
    });
  }, []);

  return {
    onLayoutRootView,
  };
};

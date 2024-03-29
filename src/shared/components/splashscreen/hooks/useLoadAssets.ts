/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import { Logger } from '$core/logger';
import { checkForOtaUpdate } from '$shared/utils/checkForAppUpdates';

SplashScreen.preventAutoHideAsync().catch((error) => {
  Logger.error({
    message: 'Failed to persist the SplashScreen',
    error,
  });
});

export const useLoadAssets = () => {
  const [areFontsLoaded] = useFonts({
    'WorkSans-Light': require('../../../../../assets/fonts/WorkSans-Light.ttf'),
    'WorkSans-Regular': require('../../../../../assets/fonts/WorkSans-Regular.ttf'),
    'WorkSans-Medium': require('../../../../../assets/fonts/WorkSans-Medium.ttf'),
    'WorkSans-Bold': require('../../../../../assets/fonts/WorkSans-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(() => {
    (async () => {
      if (areFontsLoaded) {
        await checkForOtaUpdate();
        await SplashScreen.hideAsync();
      }
    })().catch((error) => {
      Logger.error({
        message: 'Failed to hide the SplashScreen',
        error,
      });
    });
  }, [areFontsLoaded]);

  return {
    areAssetsLoaded: areFontsLoaded,
    onLayoutRootView,
  };
};

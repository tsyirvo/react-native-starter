/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import Logger from '$core/logger';
import useRunOnMount from '$hooks/useRunOnMount';

const useLoadAssets = () => {
  const [areFontsLoaded] = useFonts({
    'WorkSans-Light': require('../../../assets/fonts/WorkSans-Light.ttf'),
    'WorkSans-Regular': require('../../../assets/fonts/WorkSans-Regular.ttf'),
    'WorkSans-Medium': require('../../../assets/fonts/WorkSans-Medium.ttf'),
    'WorkSans-Bold': require('../../../assets/fonts/WorkSans-Bold.ttf'),
  });

  useRunOnMount(() => {
    (async () => {
      await SplashScreen.preventAutoHideAsync();
    })().catch((error) => {
      Logger.error({
        type: 'SplashScreen',
        message: 'Failed to auto hide the SplashScreen',
        error,
      });
    });
  });

  const onLayoutRootView = useCallback(() => {
    (async () => {
      if (areFontsLoaded) {
        await SplashScreen.hideAsync();
      }
    })().catch((error) => {
      Logger.error({
        type: 'SplashScreen',
        message: 'Failed to hide the SplashScreen',
        error,
      });
    });
  }, [areFontsLoaded]);

  return {
    areFontsLoaded,
    onLayoutRootView,
  };
};

export default useLoadAssets;
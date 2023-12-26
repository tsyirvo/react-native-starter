import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
import type { StartUpdateOptions } from 'sp-react-native-in-app-updates';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

import { config, isAndroid } from '$core/constants';
import { Logger } from '$core/logger';

import { sleep } from './sleep';

export const checkForOtaUpdate = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      const ONE_SECOND = 1_000;

      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
      await sleep(ONE_SECOND);
    }
  } catch (error) {
    Logger.error({
      error,
      level: 'warning',
      message: 'Error fetching latest Expo update',
    });
  }
};

export const checkForNativeUpdate = async (
  updateOptionsOverwrites: StartUpdateOptions,
) => {
  const inAppUpdates = new SpInAppUpdates(config.isDebug);

  const currentVersion = Application.nativeApplicationVersion;
  let updateOptions: StartUpdateOptions = {};
  const { shouldUpdate, storeVersion } = await inAppUpdates.checkNeedsUpdate();

  if (shouldUpdate) {
    if (isAndroid) {
      updateOptions = {
        ...updateOptionsOverwrites,
        updateType: IAUUpdateKind.FLEXIBLE,
      };
    } else {
      updateOptions = updateOptionsOverwrites;
    }

    return {
      shouldUpdate,
      startUpdate: async () => inAppUpdates.startUpdate(updateOptions),
      storeVersion,
      currentVersion,
    };
  }

  return {
    shouldUpdate: false,
    startUpdate: async () => {},
    storeVersion,
    currentVersion,
  };
};

import * as Updates from 'expo-updates';

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

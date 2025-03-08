import * as Updates from 'expo-updates';

import { config } from '$domain/constants';
import { Logger } from '$infra/logger';

import { sleep } from './sleep';

const ONE_SECOND = 1_000;

export const checkForOtaUpdate = async () => {
  try {
    if (config.isDebug) return;

    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
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

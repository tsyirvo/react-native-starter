import * as Updates from 'expo-updates';

import { config } from '$infra/config';
import { Logger } from '$infra/logger';
import { sleep } from '$shared/utils';

import { checkForOtaUpdate } from '../checkForOtaUpdate';

jest.mock('$shared/utils', () => ({ sleep: jest.fn() }));

const manifest = { assets: [], commitTime: 0, id: 'test-update' };
const availableUpdate = {
  isAvailable: true,
  isRollBackToEmbedded: false,
  manifest,
  reason: undefined,
} satisfies Updates.UpdateCheckResult;

describe('checkForOtaUpdate', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.replaceProperty(config, 'isDebug', false);
    jest.mocked(Updates.checkForUpdateAsync).mockResolvedValue(availableUpdate);
  });

  afterEach(() => jest.restoreAllMocks());

  it('skips the native update check in debug builds', async () => {
    jest.replaceProperty(config, 'isDebug', true);

    await checkForOtaUpdate();

    expect(Updates.checkForUpdateAsync).not.toHaveBeenCalled();
    expect(Updates.fetchUpdateAsync).not.toHaveBeenCalled();
    expect(Updates.reloadAsync).not.toHaveBeenCalled();
  });

  it('does not download or reload when no update is available', async () => {
    jest.mocked(Updates.checkForUpdateAsync).mockResolvedValue({
      isAvailable: false,
      isRollBackToEmbedded: false,
      manifest: undefined,
      reason:
        Updates.UpdateCheckResultNotAvailableReason
          .NO_UPDATE_AVAILABLE_ON_SERVER,
    });

    await checkForOtaUpdate();

    expect(Updates.checkForUpdateAsync).toHaveBeenCalledTimes(1);
    expect(Updates.fetchUpdateAsync).not.toHaveBeenCalled();
    expect(Updates.reloadAsync).not.toHaveBeenCalled();
    expect(sleep).not.toHaveBeenCalled();
  });

  it('waits for the available update to download before reloading', async () => {
    const download = Promise.withResolvers<Updates.UpdateFetchResult>();
    jest.mocked(Updates.fetchUpdateAsync).mockReturnValue(download.promise);
    const completion = checkForOtaUpdate();
    await Promise.resolve();

    expect(Updates.fetchUpdateAsync).toHaveBeenCalledTimes(1);
    expect(Updates.reloadAsync).not.toHaveBeenCalled();

    download.resolve({ isNew: true, isRollBackToEmbedded: false, manifest });
    await completion;

    expect(Updates.reloadAsync).toHaveBeenCalledTimes(1);
    expect(sleep).toHaveBeenCalledWith(1000);
    expect(Logger.error).not.toHaveBeenCalled();
  });

  it.each([
    ['check', Updates.checkForUpdateAsync],
    ['download', Updates.fetchUpdateAsync],
    ['reload', Updates.reloadAsync],
  ] as const)(
    'reports a %s failure without rejecting bootstrap',
    async (_stage, operation) => {
      const error = new Error('OTA unavailable');
      jest.mocked(operation).mockRejectedValueOnce(error);

      await expect(checkForOtaUpdate()).resolves.toBeUndefined();

      expect(Logger.error).toHaveBeenCalledWith({
        error,
        level: 'warning',
        message: 'Error fetching latest Expo update',
      });
      expect(sleep).not.toHaveBeenCalled();
    },
  );
});

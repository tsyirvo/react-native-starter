import * as Network from 'expo-network';

import { ErrorMonitoring } from '$infra/monitoring';
import { Toaster } from '$infra/toaster';
import { sleep } from '$shared/utils';
import { renderHook, waitFor } from '$testing';

import { useCheckNetworkStateOnMount } from '../useCheckNetworkStateOnMount';

jest.mock('expo-network', () => ({ getNetworkStateAsync: jest.fn() }));
jest.mock('$infra/monitoring', () => ({
  ErrorMonitoring: { breadcrumbs: jest.fn() },
}));
jest.mock('$infra/toaster', () => ({ Toaster: { show: jest.fn() } }));
jest.mock('$shared/utils', () => ({ sleep: jest.fn() }));

const mockNetworkState = (isInternetReachable: boolean) => {
  jest.mocked(Network.getNetworkStateAsync).mockResolvedValue({
    isInternetReachable,
  });
};

describe('useCheckNetworkStateOnMount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(sleep).mockResolvedValue(undefined);
  });

  it('warns the user when the internet is unreachable', async () => {
    mockNetworkState(false);

    renderHook(useCheckNetworkStateOnMount);

    await waitFor(() =>
      expect(Toaster.show).toHaveBeenCalledWith({
        text1: 'appConfig.networkStateCheck.title',
        text2: 'appConfig.networkStateCheck.message',
        type: 'info',
      }),
    );
  });

  it('stays silent when the internet is reachable', async () => {
    mockNetworkState(true);

    renderHook(useCheckNetworkStateOnMount);

    await waitFor(() =>
      expect(Network.getNetworkStateAsync).toHaveBeenCalledTimes(1),
    );
    expect(Toaster.show).not.toHaveBeenCalled();
  });

  it('records a breadcrumb when the network check fails', async () => {
    jest
      .mocked(Network.getNetworkStateAsync)
      .mockRejectedValue(new Error('network unavailable'));

    renderHook(useCheckNetworkStateOnMount);

    await waitFor(() =>
      expect(ErrorMonitoring.breadcrumbs).toHaveBeenCalledWith({
        category: 'network',
        message: 'Failed to check network state',
        type: 'network',
      }),
    );
    expect(Toaster.show).not.toHaveBeenCalled();
  });
});

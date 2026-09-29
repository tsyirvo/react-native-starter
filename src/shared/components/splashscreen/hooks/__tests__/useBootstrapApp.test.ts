import * as SplashScreen from 'expo-splash-screen';

import { useGetSessionState } from '$application/auth';
import { config } from '$domain/constants';
import { act, renderHook, waitFor } from '$domain/testing';
import { bootstrapApp } from '$infra/bootstrap';
import { useAppStore } from '$infra/store';
import { checkForOtaUpdate } from '$shared/utils';

import { useBootstrapApp } from '../useBootstrapApp';

jest.mock('expo-splash-screen', () => ({
  hide: jest.fn(),
  preventAutoHideAsync: jest.fn().mockResolvedValue(undefined),
  setOptions: jest.fn(),
}));
jest.mock('$domain/constants', () => ({
  config: { isStorybookEnabled: false },
}));
jest.mock('$infra/bootstrap', () => ({ bootstrapApp: jest.fn() }));
jest.mock('$infra/store', () => ({ useAppStore: jest.fn() }));
jest.mock('$application/auth', () => ({ useGetSessionState: jest.fn() }));
jest.mock('$shared/utils', () => ({ checkForOtaUpdate: jest.fn() }));

describe('useBootstrapApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    config.isStorybookEnabled = false;
    jest.mocked(useAppStore).mockReturnValue(true);
    jest.mocked(checkForOtaUpdate).mockResolvedValue(undefined);
  });

  it('skips SDK and OTA setup in Storybook but waits for application readiness', async () => {
    config.isStorybookEnabled = true;
    const { result, rerender } = renderHook(useBootstrapApp);

    await act(async () => {
      result.current.onLayoutRootView();
      await Promise.resolve();
    });

    expect(useGetSessionState).toHaveBeenCalled();
    expect(bootstrapApp).not.toHaveBeenCalled();
    expect(checkForOtaUpdate).not.toHaveBeenCalled();
    expect(result.current.isAppReady).toBe(false);
    jest.mocked(useAppStore).mockReturnValue(false);
    rerender({});
    expect(result.current.isAppReady).toBe(true);
    expect(SplashScreen.hide).toHaveBeenCalledTimes(1);
  });

  it('initializes SDKs and checks for updates before hiding when both paths are ready', async () => {
    let finishUpdate: (() => void) | undefined;
    jest.mocked(checkForOtaUpdate).mockReturnValue(
      new Promise<void>((resolve) => {
        finishUpdate = resolve;
      }),
    );
    const { result, rerender } = renderHook(useBootstrapApp);

    act(() => {
      result.current.onLayoutRootView();
    });

    expect(bootstrapApp).toHaveBeenCalledTimes(1);
    expect(checkForOtaUpdate).toHaveBeenCalledTimes(1);
    jest.mocked(useAppStore).mockReturnValue(false);
    rerender({});
    expect(result.current.isAppReady).toBe(false);
    expect(SplashScreen.hide).not.toHaveBeenCalled();

    await act(async () => {
      finishUpdate?.();
      await Promise.resolve();
    });

    await waitFor(() => expect(result.current.isAppReady).toBe(true));
    expect(SplashScreen.hide).toHaveBeenCalledTimes(1);
  });
});

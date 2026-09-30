import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { Analytics } from '$infra/analytics';
import { clearAccessAndRefreshTokens } from '$infra/api/token';
import { Logger } from '$infra/logger';
import { ErrorMonitoring } from '$infra/monitoring';
import { Purchase } from '$infra/purchase';
import { clearPersistedAppStore, resetAllSlices } from '$infra/store';
import { sleep } from '$shared/utils';
import { act, renderHook, waitFor } from '$testing';

import { AuthContextProvider } from '../AuthContextProvider';
import { useAuthContext } from '../useAuthContext';

jest.mock('$infra/analytics', () => ({
  Analytics: { reset: jest.fn(), setUser: jest.fn() },
}));
jest.mock('$infra/logger', () => ({ Logger: { error: jest.fn() } }));
jest.mock('$infra/monitoring', () => ({
  ErrorMonitoring: { clearUser: jest.fn(), setUser: jest.fn() },
}));
jest.mock('$infra/purchase', () => ({
  Purchase: { clearUser: jest.fn(), setUser: jest.fn() },
}));
jest.mock('$infra/api/token', () => ({
  clearAccessAndRefreshTokens: jest.fn(),
}));
jest.mock('$infra/store', () => ({
  clearPersistedAppStore: jest.fn(),
  resetAllSlices: jest.fn(),
}));
jest.mock('$shared/utils', () => ({ sleep: jest.fn() }));

const credentials = { email: 'demo@example.com', password: 'password' };
const demoUser = { email: credentials.email, id: '1' };

const createHarness = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );

  return { queryClient, wrapper };
};

describe('AuthContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(sleep).mockResolvedValue(undefined);
    jest.mocked(Purchase.setUser).mockResolvedValue(undefined);
    jest.mocked(Purchase.clearUser).mockResolvedValue(undefined);
    jest.mocked(clearAccessAndRefreshTokens).mockResolvedValue(undefined);
  });

  it('starts without a user and signs in with the demo identity', async () => {
    const { wrapper } = createHarness();
    const { result } = renderHook(useAuthContext, { wrapper });

    expect(result.current.user).toBeNull();

    await act(async () => {
      await result.current.signIn(credentials);
    });

    expect(result.current.user).toEqual(demoUser);
  });

  it('tracks the signed-in user asynchronously', async () => {
    const { wrapper } = createHarness();
    const { result } = renderHook(useAuthContext, { wrapper });

    await act(async () => {
      await result.current.signIn(credentials);
    });

    expect(Analytics.setUser).toHaveBeenCalledWith(demoUser);
    expect(ErrorMonitoring.setUser).toHaveBeenCalledWith(demoUser);
    await waitFor(() =>
      expect(Purchase.setUser).toHaveBeenCalledWith(demoUser),
    );
  });

  it('signs out and clears tracking, store, queries and tokens', async () => {
    const { queryClient, wrapper } = createHarness();
    queryClient.setQueryData(['cached-session'], 'cached');
    const { result } = renderHook(useAuthContext, { wrapper });

    await act(async () => {
      await result.current.signIn(credentials);
    });
    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.user).toBeNull();
    expect(Analytics.reset).toHaveBeenCalledTimes(1);
    expect(ErrorMonitoring.clearUser).toHaveBeenCalledTimes(1);
    expect(Purchase.clearUser).toHaveBeenCalledTimes(1);
    expect(resetAllSlices).toHaveBeenCalledTimes(1);
    expect(clearPersistedAppStore).toHaveBeenCalledTimes(1);
    expect(queryClient.getQueryData(['cached-session'])).toBeUndefined();
    expect(clearAccessAndRefreshTokens).toHaveBeenCalledTimes(1);
  });

  it('clears local auth and caches even when purchase logout fails', async () => {
    const error = new Error('purchase logout failed');
    const { queryClient, wrapper } = createHarness();
    const { result } = renderHook(useAuthContext, { wrapper });

    await act(async () => {
      await result.current.signIn(credentials);
    });
    queryClient.setQueryData(['private-data'], 'cached');
    jest.mocked(Purchase.clearUser).mockRejectedValueOnce(error);

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.user).toBeNull();
    expect(queryClient.getQueryData(['private-data'])).toBeUndefined();
    expect(resetAllSlices).toHaveBeenCalledTimes(1);
    expect(clearPersistedAppStore).toHaveBeenCalledTimes(1);
    expect(clearAccessAndRefreshTokens).toHaveBeenCalledTimes(1);
    expect(Logger.error).toHaveBeenCalledWith(
      expect.objectContaining({ error }),
    );
  });

  it('tracks the next sign-in even when token cleanup fails', async () => {
    const { wrapper } = createHarness();
    const { result } = renderHook(useAuthContext, { wrapper });

    await act(async () => {
      await result.current.signIn(credentials);
    });
    jest
      .mocked(clearAccessAndRefreshTokens)
      .mockRejectedValueOnce(new Error('token cleanup failed'));
    await act(async () => {
      await result.current.signOut();
    });
    await act(async () => {
      await result.current.signIn(credentials);
    });

    await waitFor(() => expect(Purchase.setUser).toHaveBeenCalledTimes(2));
    expect(Analytics.setUser).toHaveBeenCalledTimes(2);
  });
});

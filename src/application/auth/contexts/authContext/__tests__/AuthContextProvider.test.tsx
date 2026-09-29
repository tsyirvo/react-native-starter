import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { act, renderHook, waitFor } from '$domain/testing';
import { Analytics } from '$infra/analytics';
import { clearAccessAndRefreshTokens } from '$infra/api/token';
import { ErrorMonitoring } from '$infra/monitoring';
import { Purchase } from '$infra/purchase';
import { clearPersistedAppStore, resetAllSlices } from '$infra/store';
import { sleep } from '$shared/utils';

import { AuthContextProvider } from '../AuthContextProvider';
import { useAuthContext } from '../useAuthContext';

jest.mock('$infra/analytics', () => ({
  Analytics: { reset: jest.fn(), setUser: jest.fn() },
}));
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
});

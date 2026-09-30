import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { AuthContextProvider, useAuthContext } from '$application/auth';
import {
  SubscriptionContextProvider,
  useSubscriptionContext,
} from '$features/subscription';
import { Logger } from '$infra/logger';
import { Purchase } from '$infra/purchase';
import { act, renderHook, waitFor } from '$testing';

jest.mock('$infra/analytics', () => ({
  Analytics: { reset: jest.fn(), setUser: jest.fn() },
}));
jest.mock('$infra/monitoring', () => ({
  ErrorMonitoring: { clearUser: jest.fn(), setUser: jest.fn() },
}));
jest.mock('$infra/logger', () => ({ Logger: { error: jest.fn() } }));
jest.mock('$infra/featureFlags', () => ({
  useGetRemoteConfigSync: () => ({ getFlagPayloadSync: () => undefined }),
}));
jest.mock('$infra/purchase', () => ({
  Purchase: {
    clearUser: jest.fn(),
    customerListener: jest.fn(),
    getOfferings: jest.fn(),
    isPayingUser: jest.fn(),
    setUser: jest.fn(),
  },
}));
jest.mock('$infra/api/token', () => ({
  clearAccessAndRefreshTokens: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('$infra/store', () => ({
  clearPersistedAppStore: jest.fn(),
  resetAllSlices: jest.fn(),
}));
jest.mock('$shared/utils', () => ({
  sleep: jest.fn().mockResolvedValue(undefined),
}));

interface WrapperProps {
  children: ReactNode;
}

const createHarness = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SubscriptionContextProvider>{children}</SubscriptionContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );

  return renderHook(
    () => ({
      auth: useAuthContext(),
      subscription: useSubscriptionContext(),
    }),
    { wrapper },
  );
};

const credentials = { email: 'demo@example.com', password: 'password' };

describe('auth and subscription identity lifecycle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(Purchase.setUser).mockResolvedValue(undefined);
    jest.mocked(Purchase.clearUser).mockResolvedValue(undefined);
    jest.mocked(Purchase.isPayingUser).mockResolvedValue(true);
    jest
      .mocked(Purchase.getOfferings)
      .mockResolvedValue({ all: {}, current: null });
    jest.mocked(Purchase.customerListener).mockReturnValue(jest.fn());
  });

  it('identifies once and waits for that identity before reading entitlements', async () => {
    const identity = Promise.withResolvers<void>();
    jest.mocked(Purchase.setUser).mockReturnValueOnce(identity.promise);
    const { result } = createHarness();

    await act(async () => {
      await result.current.auth.signIn(credentials);
    });

    expect(result.current.auth.isPurchaseUserReady).toBe(false);
    expect(Purchase.setUser).toHaveBeenCalledTimes(1);
    expect(Purchase.isPayingUser).not.toHaveBeenCalled();
    expect(Purchase.customerListener).not.toHaveBeenCalled();

    await act(async () => {
      identity.resolve();
      await identity.promise;
    });

    await waitFor(() =>
      expect(result.current.subscription.isPayingUser).toBe(true),
    );
    expect(result.current.auth.isPurchaseUserReady).toBe(true);
    expect(Purchase.setUser).toHaveBeenCalledTimes(1);
  });

  it('clears local auth immediately and queues logout after an in-flight identification', async () => {
    const identity = Promise.withResolvers<void>();
    jest.mocked(Purchase.setUser).mockReturnValueOnce(identity.promise);
    const { result } = createHarness();

    await act(async () => {
      await result.current.auth.signIn(credentials);
    });
    let signOut: Promise<void> | undefined;
    act(() => {
      signOut = result.current.auth.signOut();
    });

    expect(result.current.auth.user).toBeNull();
    expect(result.current.subscription.isPayingUser).toBe(false);
    expect(Purchase.clearUser).not.toHaveBeenCalled();

    await act(async () => {
      identity.resolve();
      await signOut;
    });

    expect(Purchase.clearUser).toHaveBeenCalledTimes(1);
    expect(result.current.auth.isPurchaseUserReady).toBe(false);
    expect(Purchase.isPayingUser).not.toHaveBeenCalled();
  });

  it('waits for pending logout before identifying the next sign-in', async () => {
    const { result } = createHarness();
    await act(async () => {
      await result.current.auth.signIn(credentials);
    });
    await waitFor(() =>
      expect(result.current.auth.isPurchaseUserReady).toBe(true),
    );

    const logout = Promise.withResolvers<void>();
    jest.mocked(Purchase.clearUser).mockReturnValueOnce(logout.promise);
    let signOut: Promise<void> | undefined;
    act(() => {
      signOut = result.current.auth.signOut();
    });
    await act(async () => {
      await result.current.auth.signIn({
        ...credentials,
        email: 'next@example.com',
      });
    });

    expect(result.current.auth.isPurchaseUserReady).toBe(false);
    expect(result.current.subscription.isPayingUser).toBeNull();
    expect(Purchase.setUser).toHaveBeenCalledTimes(1);

    await act(async () => {
      logout.resolve();
      await signOut;
    });

    await waitFor(() =>
      expect(result.current.auth.isPurchaseUserReady).toBe(true),
    );
    expect(Purchase.setUser).toHaveBeenCalledTimes(2);
    expect(Purchase.setUser).toHaveBeenLastCalledWith({
      email: 'next@example.com',
      id: '1',
    });
  });

  it('keeps demo auth usable but does not query an unidentified purchase customer', async () => {
    const error = new Error('purchase identification failed');
    jest.mocked(Purchase.setUser).mockRejectedValueOnce(error);
    const { result } = createHarness();

    await act(async () => {
      await result.current.auth.signIn(credentials);
    });

    await waitFor(() =>
      expect(Logger.error).toHaveBeenCalledWith(
        expect.objectContaining({ error }),
      ),
    );
    expect(result.current.auth.user).not.toBeNull();
    expect(result.current.auth.isPurchaseUserReady).toBe(false);
    expect(Purchase.isPayingUser).not.toHaveBeenCalled();
    expect(Purchase.customerListener).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.auth.signOut();
      await result.current.auth.signIn(credentials);
    });

    await waitFor(() =>
      expect(result.current.auth.isPurchaseUserReady).toBe(true),
    );
  });
});

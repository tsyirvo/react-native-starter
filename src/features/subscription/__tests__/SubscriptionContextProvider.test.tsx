import type { ReactNode } from 'react';
import type { CustomerInfo, PurchasesOfferings } from 'react-native-purchases';
import { useAuthContext } from '$application/auth';
import { act, renderHook, waitFor } from '$domain/testing';
import { useGetRemoteConfigSync } from '$infra/featureFlags';
import { Logger } from '$infra/logger';
import { Purchase } from '$infra/purchase';

import { SubscriptionContextProvider } from '../SubscriptionContextProvider';
import { useSubscriptionContext } from '../useSubscriptionContext';

jest.mock('$application/auth', () => ({
  useAuthContext: jest.fn(),
}));
jest.mock('$infra/featureFlags', () => ({ useGetRemoteConfigSync: jest.fn() }));
jest.mock('$infra/logger', () => ({ Logger: { error: jest.fn() } }));
jest.mock('$infra/purchase', () => ({
  Purchase: {
    customerListener: jest.fn(),
    getOfferings: jest.fn(),
    isPayingUser: jest.fn(),
    setUser: jest.fn(),
  },
}));

const user = { email: 'demo@example.com', id: '1' };
const getFlagPayloadSync = jest.fn();
const currentOffering = { identifier: 'current' };
const selectedOffering = { identifier: 'selected' };
const offerings = {
  all: { current: currentOffering, selected: selectedOffering },
  current: currentOffering,
} as unknown as PurchasesOfferings;
const wrapper = ({ children }: { children: ReactNode }) => (
  <SubscriptionContextProvider>{children}</SubscriptionContextProvider>
);

const setAuthUser = (authUser: typeof user | null) => {
  jest.mocked(useAuthContext).mockReturnValue({
    signIn: jest.fn(),
    signOut: jest.fn(),
    user: authUser,
  });
};

describe('SubscriptionContextProvider', () => {
  const unsubscribe = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    setAuthUser(null);
    getFlagPayloadSync.mockReturnValue(undefined);
    jest.mocked(useGetRemoteConfigSync).mockReturnValue({ getFlagPayloadSync });
    jest.mocked(Purchase.customerListener).mockReturnValue(unsubscribe);
    jest.mocked(Purchase.getOfferings).mockResolvedValue(offerings);
    jest.mocked(Purchase.setUser).mockResolvedValue(undefined);
    jest.mocked(Purchase.isPayingUser).mockResolvedValue(false);
  });

  it('treats a missing user as non-paying without querying their status', async () => {
    const { result } = renderHook(useSubscriptionContext, { wrapper });

    await waitFor(() => expect(result.current.isPayingUser).toBe(false));
    expect(Purchase.setUser).not.toHaveBeenCalled();
    expect(Purchase.isPayingUser).not.toHaveBeenCalled();
  });

  it('fetches paying status when authenticated', async () => {
    setAuthUser(user);
    jest.mocked(Purchase.isPayingUser).mockResolvedValue(true);

    const { result } = renderHook(useSubscriptionContext, { wrapper });

    await waitFor(() => expect(result.current.isPayingUser).toBe(true));
    expect(Purchase.setUser).toHaveBeenCalledWith(user);
  });

  it('falls back to non-paying when fetching status fails', async () => {
    const error = new Error('subscription unavailable');
    setAuthUser(user);
    jest.mocked(Purchase.isPayingUser).mockRejectedValue(error);

    const { result } = renderHook(useSubscriptionContext, { wrapper });

    await waitFor(() => expect(result.current.isPayingUser).toBe(false));
    expect(Logger.error).toHaveBeenCalledWith({
      error,
      level: 'warning',
      message: 'Failed to fetch user subscription status',
    });
  });

  it('applies customer updates and removes the listener on unmount', async () => {
    const { result, unmount } = renderHook(useSubscriptionContext, { wrapper });
    await waitFor(() => expect(result.current.isPayingUser).toBe(false));

    const listener = jest.mocked(Purchase.customerListener).mock.calls[0]?.[0];
    expect(listener).toBeDefined();
    act(() => {
      listener?.({
        entitlements: { active: { premium: {} } },
      } as unknown as CustomerInfo);
    });

    expect(result.current.isPayingUser).toBe(true);
    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('uses the remotely selected offering when available', async () => {
    getFlagPayloadSync.mockReturnValue({
      offering: 'selected',
      type: 'offering',
    });
    const { result } = renderHook(useSubscriptionContext, { wrapper });

    await waitFor(() =>
      expect(result.current.offeringToDisplay).toBe(selectedOffering),
    );
  });

  it('falls back to the current offering when the selected one is missing', async () => {
    getFlagPayloadSync.mockReturnValue({
      offering: 'missing',
      type: 'offering',
    });
    const { result } = renderHook(useSubscriptionContext, { wrapper });

    await waitFor(() =>
      expect(result.current.offeringToDisplay).toBe(currentOffering),
    );
  });

  it('logs a failed offering fetch and leaves the offering empty', async () => {
    const error = new Error('offerings unavailable');
    jest.mocked(Purchase.getOfferings).mockRejectedValue(error);
    const { result } = renderHook(useSubscriptionContext, { wrapper });

    await waitFor(() =>
      expect(Logger.error).toHaveBeenCalledWith({
        error,
        level: 'warning',
        message: 'Failed to fetch offering to display',
      }),
    );
    expect(result.current.offeringToDisplay).toBeNull();
  });
});

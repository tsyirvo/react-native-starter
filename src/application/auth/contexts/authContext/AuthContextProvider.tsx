import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { User, UserLogin } from '$domain/entities';
import { Analytics } from '$infra/analytics';
import { clearAccessAndRefreshTokens } from '$infra/api/token';
import { Logger } from '$infra/logger';
import { ErrorMonitoring } from '$infra/monitoring';
import { Purchase } from '$infra/purchase';
import { clearPersistedAppStore, resetAllSlices } from '$infra/store';
import { sleep } from '$shared/utils';

import AuthContext from './AuthContext';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const purchaseIdentityRef = useRef<Promise<void>>(Promise.resolve());

  const [user, setUser] = useState<User | null>(null);
  const [purchaseUser, setPurchaseUser] = useState<User | null>(null);

  const isPurchaseUserReady = user !== null && purchaseUser === user;

  const queryClient = useQueryClient();

  const clearStore = useCallback(() => {
    resetAllSlices();
    clearPersistedAppStore();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    let isActive = true;

    // Serialize identity changes so a pending login cannot finish after logout.
    purchaseIdentityRef.current = purchaseIdentityRef.current
      .then(async () => {
        if (!isActive) {
          return;
        }

        Analytics.setUser(user);
        ErrorMonitoring.setUser(user);
        await Purchase.setUser(user);

        if (isActive) {
          setPurchaseUser(user);
        }
      })
      .catch((error: unknown) => {
        Logger.error({
          error,
          level: 'warning',
          message: 'Failed to identify the purchase user',
        });
      });

    return () => {
      isActive = false;
    };
  }, [user]);

  const stopTrackingUser = useCallback(async () => {
    Analytics.reset();
    ErrorMonitoring.clearUser();

    purchaseIdentityRef.current = purchaseIdentityRef.current
      .then(() => Purchase.clearUser())
      .catch((error: unknown) => {
        Logger.error({
          error,
          level: 'warning',
          message: 'Failed to clear the purchase user',
        });
      });

    await purchaseIdentityRef.current;
  }, []);

  const signIn = useCallback(async (data: UserLogin) => {
    try {
      // TODO(prod): Only here to simulate async operation
      await sleep(150);

      const userDataPayload = {
        email: data.email,
        id: '1',
      };

      setUser(userDataPayload);
    } catch (error) {
      Logger.error({
        error,
        level: 'info',
        message: 'Failed to sign in',
      });
    }
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    setPurchaseUser(null);

    try {
      clearStore();
      queryClient.clear();

      await Promise.all([
        user ? stopTrackingUser() : Promise.resolve(),
        clearAccessAndRefreshTokens(),
      ]);
    } catch (error) {
      Logger.error({
        error,
        level: 'info',
        message: 'Failed to sign out',
      });
    }
  }, [queryClient, user, clearStore, stopTrackingUser]);

  const value = useMemo(
    () => ({
      isPurchaseUserReady,
      signIn,
      signOut,
      user,
    }),
    [user, isPurchaseUserReady, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

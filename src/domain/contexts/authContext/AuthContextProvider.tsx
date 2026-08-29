import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { User, UserLogin } from '$domain/entities';
import { Analytics } from '$infra/analytics';
import { clearAccessAndRefreshTokens } from '$infra/api/token';
import { Logger } from '$infra/logger';
import { ErrorMonitoring } from '$infra/monitoring';
import { Purchase } from '$infra/purchase';
import {
  clearPersistedAppStore,
  resetAllSlices,
  useAppStore,
} from '$infra/store';
import { sleep } from '$shared/utils';

import AuthContext from './AuthContext';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const hasTrackedUserRef = useRef(false);

  const [user, setUser] = useState<User | null>(null);

  const setIsUserLoggedIn = useAppStore((state) => state.setIsUserLoggedIn);

  const queryClient = useQueryClient();

  const clearStore = useCallback(() => {
    resetAllSlices();
    clearPersistedAppStore();
  }, []);

  const startTrackingUser = useCallback(async (authenticatedUser: User) => {
    Analytics.setUser(authenticatedUser);

    ErrorMonitoring.setUser(authenticatedUser);

    await Purchase.setUser(authenticatedUser);
  }, []);

  const stopTrackingUser = useCallback(async () => {
    Analytics.reset();

    ErrorMonitoring.clearUser();

    await Purchase.clearUser();
  }, []);

  useEffect(() => {
    if (user && !hasTrackedUserRef.current) {
      hasTrackedUserRef.current = true;

      void startTrackingUser(user);
    }
  }, [user, startTrackingUser]);

  const signIn = useCallback(
    async (data: UserLogin) => {
      try {
        // TODO(prod): Only here to simulate async operation
        await sleep(150);

        const userDataPayload = {
          email: data.email,
          id: '1',
        };

        setUser(userDataPayload);
        setIsUserLoggedIn(true);
      } catch (error) {
        Logger.error({
          error,
          level: 'info',
          message: 'Failed to sign in',
        });
      }
    },
    [setIsUserLoggedIn],
  );

  const signOut = useCallback(async () => {
    try {
      if (user) {
        await stopTrackingUser();
      }

      setUser(null);
      setIsUserLoggedIn(false);

      clearStore();
      queryClient.clear();

      await clearAccessAndRefreshTokens();

      hasTrackedUserRef.current = false;
    } catch (error) {
      Logger.error({
        error,
        level: 'info',
        message: 'Failed to sign out',
      });
    }
  }, [queryClient, user, clearStore, stopTrackingUser, setIsUserLoggedIn]);

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      user,
    }),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

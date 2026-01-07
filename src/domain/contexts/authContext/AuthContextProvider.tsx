import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { User, UserLogin } from '$domain/entities';
import { Analytics } from '$infra/analytics';
import { clearAccessAndRefreshTokens } from '$infra/api/token';
import { Logger } from '$infra/logger';
import { ErrorMonitoring } from '$infra/monitoring';
import { Notifications } from '$infra/notifications';
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
  const [user, setUser] = useState<User | null>(null);

  const setIsUserLoggedIn = useAppStore((state) => state.setIsUserLoggedIn);

  const queryClient = useQueryClient();

  const clearStore = useCallback(() => {
    resetAllSlices();
    clearPersistedAppStore();
  }, []);

  const startTrackingUser = useCallback(async (user: User) => {
    Analytics.setUser(user);

    ErrorMonitoring.setUser(user);

    await Purchase.setUser(user.id);

    Notifications.setUser(user.id);
    Notifications.setUserEmail(user.email);
  }, []);

  const stopTrackingUser = useCallback(async (user: User) => {
    Analytics.reset();

    ErrorMonitoring.clearUser();

    await Purchase.clearUser();

    Notifications.removeUser();
    Notifications.removeUserEmail(user.email);
  }, []);

  const signIn = useCallback(
    async (data: UserLogin) => {
      try {
        // TODO(prod): Only here to simulate async operation
        await sleep(150);

        const userDataPayload = {
          id: '1',
          email: data.email,
        };

        setUser(userDataPayload);
        setIsUserLoggedIn(true);

        await startTrackingUser(userDataPayload);
      } catch (error) {
        Logger.error({
          error,
          level: 'info',
          message: 'Failed to sign in',
        });
      }
    },
    [setIsUserLoggedIn, startTrackingUser],
  );

  const signOut = useCallback(async () => {
    try {
      if (user) {
        await stopTrackingUser(user);
      }

      setUser(null);
      setIsUserLoggedIn(false);

      clearStore();
      queryClient.clear();

      await clearAccessAndRefreshTokens();
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
      user,
      signIn,
      signOut,
    }),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

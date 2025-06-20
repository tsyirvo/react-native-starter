import { useEffect, useState } from 'react';

import { useGetUserSession } from '$application/auth';
import { Logger } from '$infra/logger';
import { useAppStore } from '$infra/store';

export const useGetSessionState = () => {
  const [isSessionReady, setIsSessionReady] = useState(false);

  const setIsBootstrappingAuthentication = useAppStore(
    (state) => state.setIsBootstrappingAuthentication,
  );

  const { isFetched, isError, error, failureCount } = useGetUserSession();

  useEffect(() => {
    if (isSessionReady) return;

    if (isError && failureCount <= 1) {
      Logger.dev('Failed to fetch session on app bootstrap. Retrying...', {
        isFetched,
        isError,
        error,
        failureCount,
      });

      return;
    }

    if (isFetched) {
      // TODO(prod): Implement logic to set isUserLoggedIn

      setIsBootstrappingAuthentication(false);
      setIsSessionReady(true);
    }
  }, [
    isSessionReady,
    isFetched,
    isError,
    error,
    failureCount,
    setIsBootstrappingAuthentication,
  ]);
};

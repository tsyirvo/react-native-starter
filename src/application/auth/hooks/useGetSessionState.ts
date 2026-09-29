import { useEffect, useState } from 'react';
import { Logger } from '$infra/logger';
import { useAppStore } from '$infra/store';
import { useGetUserSession } from './useGetUserSession';

export const useGetSessionState = () => {
  const [isSessionReady, setIsSessionReady] = useState(false);

  const setIsBootstrappingApplication = useAppStore(
    (state) => state.setIsBootstrappingApplication,
  );

  const { isFetched, isError, error, failureCount } = useGetUserSession();

  useEffect(() => {
    if (isSessionReady) {
      return;
    }

    if (isError && failureCount <= 1) {
      Logger.dev('Failed to fetch session on app bootstrap. Retrying...', {
        error,
        failureCount,
        isError,
        isFetched,
      });

      return;
    }

    if (isFetched) {
      // TODO(prod): Restore authentication when a real session query exists.

      setIsBootstrappingApplication(false);
      setIsSessionReady(true);
    }
  }, [
    isSessionReady,
    isFetched,
    isError,
    error,
    failureCount,
    setIsBootstrappingApplication,
  ]);
};

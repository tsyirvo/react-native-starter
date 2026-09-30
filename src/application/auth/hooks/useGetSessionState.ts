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
    if (isSessionReady || !isFetched) {
      return;
    }

    if (isError) {
      Logger.dev(
        'Failed to fetch session on app bootstrap. Continuing without a session.',
        {
          error,
          failureCount,
          isError,
          isFetched,
        },
      );
    }

    // TODO(prod): Restore authentication when a real session query exists.
    setIsBootstrappingApplication(false);
    setIsSessionReady(true);
  }, [
    isSessionReady,
    isFetched,
    isError,
    error,
    failureCount,
    setIsBootstrappingApplication,
  ]);
};

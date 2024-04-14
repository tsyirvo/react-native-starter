import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';

import { storageKeys } from '$core/constants';
import { Logger } from '$core/logger';
import { QueryClientStorage } from '$core/storage';

import { checkIfTokenExpiredAndRefresh } from './token';
import { GC_TIME, STALE_TIME, THIRTY_DAYS } from './utils/queryClient.utils';

const asyncStoragePersister = createAsyncStoragePersister({
  key: storageKeys.queryStorage.id,
  storage: QueryClientStorage,
});

export const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  persister: asyncStoragePersister,
  buster: 'v1',
  maxAge: THIRTY_DAYS,
};

const MAX_RETRY_COUNT = 3;
const INTIAL_RETRY_COUNT = 0;
let retryCount = INTIAL_RETRY_COUNT;

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_, query) => {
      // TODO(prod): Only execute this logic on 401 errors
      if (retryCount < MAX_RETRY_COUNT) {
        checkIfTokenExpiredAndRefresh()
          .then(async (jwtToken) => {
            if (!jwtToken) return null;

            retryCount++;

            return queryClient.refetchQueries({ queryKey: query.queryKey });
          })
          .catch((jwtTokenError: unknown) => {
            Logger.error({
              error: jwtTokenError,
              level: 'error',
              message:
                'Error while getting token from secure store or refreshing it',
            });
          });
      }
    },
    onSuccess: () => {
      retryCount = INTIAL_RETRY_COUNT;
    },
  }),
  defaultOptions: {
    queries: {
      // Disable retry to handle token refresh
      retry: false,
      staleTime: STALE_TIME, // 5 minutes
      gcTime: GC_TIME, // 24 hours
      refetchOnWindowFocus: false,
    },
  },
});

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import {
  MutationCache,
  matchQuery,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';

import { storageKeys } from '$domain/constants';
import { Logger } from '$infra/logger';
import { QueryClientStorage } from '$infra/storage';

import { GC_TIME, STALE_TIME, THIRTY_DAYS } from './utils/queryClient.utils';
import { refreshAccessTokenAndRetry } from './utils/requestFailureQueue';

const asyncStoragePersister = createAsyncStoragePersister({
  key: storageKeys.queryStorage.id,
  storage: QueryClientStorage,
});

export const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  buster: 'v1',
  maxAge: THIRTY_DAYS,
  persister: asyncStoragePersister,
};

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      gcTime: GC_TIME, // 24 hours
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: STALE_TIME, // 5 minutes
    },
  },
  mutationCache: new MutationCache({
    onError: (error, variables, _, mutation) => {
      // TODO(prod): Properly handle 401 errors based on API response
      if (error.message === '401 Unauthorized') {
        refreshAccessTokenAndRetry(undefined, mutation, variables).catch(
          (refreshError: unknown) => {
            Logger.error({
              error: refreshError,
              message: 'Error while refreshing the access token',
            });
          },
        );
      } else {
        Logger.error({
          error,
          message: 'Error while performing a mutation',
        });
      }
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      const queriesToInvalidate = mutation.meta?.invalidates;

      if (queriesToInvalidate?.length) {
        queryClient
          .invalidateQueries({
            predicate: (query) =>
              // invalidate all matching tags at once or nothing if no meta is not provided
              queriesToInvalidate.some((queryKey) =>
                matchQuery({ queryKey }, query),
              ),
          })
          .catch((error: unknown) => {
            Logger.error({
              error,
              message: 'Error while invalidating queries after a mutation',
            });
          });
      }
    },
  }),
  queryCache: new QueryCache({
    onError: (error, query) => {
      // TODO(prod): Properly handle 401 errors based on API response
      if (error.message === '401 Unauthorized') {
        refreshAccessTokenAndRetry(query).catch((refreshError: unknown) => {
          Logger.error({
            error: refreshError,
            message: 'Error while refreshing the access token',
          });
        });
      } else {
        Logger.error({
          error,
          message: 'Error while performing a query',
        });
      }
    },
  }),
});

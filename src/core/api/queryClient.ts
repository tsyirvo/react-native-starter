import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  matchQuery,
} from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';

import { storageKeys } from '$core/constants';
import { Logger } from '$core/logger';
import { QueryClientStorage } from '$core/storage';

import { GC_TIME, STALE_TIME, THIRTY_DAYS } from './utils/queryClient.utils';
import { refreshAccessTokenAndRetry } from './utils/requestFailureQueue';

const asyncStoragePersister = createAsyncStoragePersister({
  key: storageKeys.queryStorage.id,
  storage: QueryClientStorage,
});

export const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  persister: asyncStoragePersister,
  buster: 'v1',
  maxAge: THIRTY_DAYS,
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // TODO(prod): Properly handle 401 errors based on API response
      if (error.message === '401 Unauthorized') {
        refreshAccessTokenAndRetry(query).catch((error: unknown) => {
          Logger.error({
            error,
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
  mutationCache: new MutationCache({
    // eslint-disable-next-line max-params
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
    // eslint-disable-next-line max-params
    onError: (error, variables, _, mutation) => {
      // TODO(prod): Properly handle 401 errors based on API response
      if (error.message === '401 Unauthorized') {
        refreshAccessTokenAndRetry(undefined, mutation, variables).catch(
          (error: unknown) => {
            Logger.error({
              error,
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
  }),
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: STALE_TIME, // 5 minutes
      gcTime: GC_TIME, // 24 hours
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

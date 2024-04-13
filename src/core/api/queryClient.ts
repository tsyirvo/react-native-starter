import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';

import { storageKeys } from '$core/constants';
import { QueryClientStorage } from '$core/storage';

import {
  GC_TIME,
  STALE_TIME,
  THIRTY_DAYS,
  retryDelay,
} from './utils/queryClient.utils';

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
  defaultOptions: {
    queries: {
      retryDelay,
      staleTime: STALE_TIME, // 5 minutes
      gcTime: GC_TIME, // 24 hours
      refetchOnWindowFocus: false,
    },
  },
});

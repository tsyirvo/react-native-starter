import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createAppSlice } from './slices/app';
import { createSessionSlice } from './slices/session';
import type { StoreState } from './types/store.types';
import { generatePersistOptions } from './utils';

const persistOptions: PersistOptions<StoreState> = generatePersistOptions({
  doNotPersist: ['isBootstrappingApplication', 'isUserLoggedIn'],
});

export const useAppStore = create<
  StoreState,
  [['zustand/immer', StoreState], ['zustand/persist', StoreState]]
>(
  immer(
    persist(
      (...a) => ({
        ...createAppSlice(...a),
        ...createSessionSlice(...a),
      }),
      persistOptions,
    ),
  ),
);

export const clearPersistedAppStore = () => {
  useAppStore.persist.clearStorage();
};

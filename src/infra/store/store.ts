import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createAppSlice } from './slices/app';
import type { StoreState } from './types/store.types';
import { generatePersistOptions } from './utils';

const persistOptions: PersistOptions<StoreState> = generatePersistOptions({
  doNotPersist: ['isBootstrappingApplication'],
});

export const useAppStore = create<
  StoreState,
  [['zustand/immer', StoreState], ['zustand/persist', StoreState]]
>(immer(persist((...a) => createAppSlice(...a), persistOptions)));

export const clearPersistedAppStore = () => {
  useAppStore.persist.clearStorage();
};

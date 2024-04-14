import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { storageKeys } from '$core/constants';
import { StoreStorage } from '$core/storage';

import { createAppSlice } from './slices/app';
import { createSessionSlice } from './slices/session';
import type { StoreState } from './types/store.types';

const persistOptions: PersistOptions<StoreState> = {
  name: storageKeys.storeStorage.id,
  version: 0,
  storage: createJSONStorage(() => StoreStorage),
};

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

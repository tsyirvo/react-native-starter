import type { PersistOptions } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import { StoreStorage } from '$infra/storage';
import { storageKeys } from '$infra/storage/storageKeys';

import type { StoreState } from '../types/store.types';

interface PersistOptionsParams {
  doNotPersist: (keyof StoreState)[];
}

export const generatePersistOptions = (
  params: PersistOptionsParams,
): PersistOptions<StoreState> => {
  const { doNotPersist = [] } = params;

  return {
    name: storageKeys.storeStorage.id,
    partialize: (state: StoreState) =>
      doNotPersist.length > 0
        ? Object.keys(state)
            .filter((key) => !doNotPersist.includes(key as keyof StoreState))
            .reduce<StoreState>((acc, key) => {
              // @ts-expect-error: key is infered as string when it's keyof StoreState
              acc[key] = state[key];

              return acc;
            }, {} as StoreState)
        : state,
    storage: createJSONStorage(() => StoreStorage),
    version: 0,
  };
};

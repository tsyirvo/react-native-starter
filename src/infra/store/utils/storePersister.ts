import type { PersistOptions } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';

import { storageKeys } from '$domain/constants';
import { StoreStorage } from '$infra/storage';

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
    version: 0,
    storage: createJSONStorage(() => StoreStorage),
    partialize: (state: StoreState) =>
      doNotPersist.length > 0
        ? Object.keys(state)
            .filter((key) => !doNotPersist.includes(key as keyof StoreState))
            .reduce<StoreState>((acc, key) => {
              // @ts-expect-error: key is infered as string when it's keyof StoreState
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              acc[key] = state[key];

              return acc;
            }, {} as StoreState)
        : state,
  };
};

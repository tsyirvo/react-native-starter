import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import type { SyncedOptions } from '@legendapp/state/sync';

import { storageKeys } from '$infra/storage';

export const createPersistOptions = <T>(name: string): SyncedOptions<T> => ({
  persist: {
    mmkv: { id: storageKeys.storeStorage.id },
    name,
    plugin: ObservablePersistMMKV,
  },
});

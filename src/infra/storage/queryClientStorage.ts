import type { Configuration } from 'react-native-mmkv';
import { createMMKV, MMKV } from 'react-native-mmkv';

import { storageKeys } from '$domain/constants';

class StorageClass {
  private _storage: MMKV;

  constructor(config?: Configuration) {
    this._storage = createMMKV(config);
  }

  setItem = (key: string, value: string) => {
    this._storage.set(key, value);
  };

  getItem = (key: string) => {
    const value = this._storage.getString(key);

    return value ?? null;
  };

  removeItem = (key: string) => {
    this._storage.remove(key);
  };
}

export const QueryClientStorage = new StorageClass({
  id: storageKeys.queryStorage.id,
});

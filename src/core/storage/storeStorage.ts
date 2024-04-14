import type { MMKVConfiguration } from 'react-native-mmkv';
import { MMKV } from 'react-native-mmkv';

import { storageKeys } from '$core/constants';

class StorageClass {
  private _storage: MMKV;

  constructor(config?: MMKVConfiguration) {
    this._storage = new MMKV(config);
  }

  setItem = (key: string, value: string) => {
    this._storage.set(key, value);
  };

  getItem = (key: string) => {
    const value = this._storage.getString(key);

    if (!value) return null;

    return value;
  };

  removeItem = (key: string) => {
    this._storage.delete(key);
  };
}

export const StoreStorage = new StorageClass({
  id: storageKeys.storeStorage.id,
});

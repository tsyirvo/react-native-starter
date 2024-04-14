import type { MMKVConfiguration } from 'react-native-mmkv';
import { MMKV } from 'react-native-mmkv';

import { storageKeys } from '$core/constants';

class StorageClass {
  private _storage: MMKV;

  constructor(config?: MMKVConfiguration) {
    this._storage = new MMKV(config);
  }

  setItem = async (key: string, value: string) => {
    this._storage.set(key, value);

    return Promise.resolve();
  };

  getItem = async (key: string) => {
    const value = this._storage.getString(key);

    if (!value) return Promise.resolve(null);

    return Promise.resolve(value);
  };

  removeItem = async (key: string) => {
    this._storage.delete(key);

    return Promise.resolve();
  };
}

export const QueryClientStorage = new StorageClass({
  id: storageKeys.queryStorage.id,
});

import { MMKV } from 'react-native-mmkv';

import { storageKeys } from '$core/constants';

export const ProductTrackingStorage = new MMKV({
  id: storageKeys.productTrackingStorage.id,
});

const getItem = (key: string) => ProductTrackingStorage.getString(key) ?? null;

const setItem = (key: string, value: string) => {
  ProductTrackingStorage.set(key, value);
};

export const CustomProductTrackingStorage = {
  getItem,
  setItem,
};

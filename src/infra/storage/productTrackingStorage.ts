import { createMMKV } from 'react-native-mmkv';

import { storageKeys } from '$domain/constants';

export const ProductTrackingStorage = createMMKV({
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

import { createMMKV } from 'react-native-mmkv';

import { storageKeys } from './storageKeys';

export const AppStorage = createMMKV({
  id: storageKeys.appStorage.id,
});

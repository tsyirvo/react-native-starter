import { createMMKV } from 'react-native-mmkv';

import { storageKeys } from '$domain/constants';

export const AppStorage = createMMKV({
  id: storageKeys.appStorage.id,
});

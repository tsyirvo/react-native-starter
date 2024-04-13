import { MMKV } from 'react-native-mmkv';

import { storageKeys } from '$core/constants';

export const AppStorage = new MMKV({
  id: storageKeys.appStorage.id,
});

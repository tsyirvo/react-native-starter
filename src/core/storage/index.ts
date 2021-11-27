import { MMKV } from 'react-native-mmkv';

const AppStorage = new MMKV({
  id: 'app-storage',
});

export default AppStorage;

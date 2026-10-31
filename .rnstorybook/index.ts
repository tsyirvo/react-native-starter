import { createMMKV } from 'react-native-mmkv';
import { view } from './storybook.requires';

const storybookStorage = createMMKV({ id: 'storybook-storage' });

const StorybookUIRoot = view.getStorybookUI({
  shouldPersistSelection: true,
  storage: {
    getItem: (key) => storybookStorage.getString(key) ?? null,
    setItem: (key, value) => {
      storybookStorage.set(key, value);
    },
  },
});

export default StorybookUIRoot;

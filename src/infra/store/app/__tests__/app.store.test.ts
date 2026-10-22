import type { MMKV } from 'react-native-mmkv';
import { createMMKV } from 'react-native-mmkv';

import { act, renderHook, waitFor } from '$testing';

const mockStorages = new Map<string, MMKV>();

// The library mock creates a new in-memory instance per call; share it per id
// so the store reads what the test seeded as a previous launch.
jest.mock('react-native-mmkv', () => {
  const actual =
    jest.requireActual<typeof import('react-native-mmkv')>('react-native-mmkv');

  return {
    ...actual,
    createMMKV: (config?: { id: string }) => {
      const id = config?.id ?? 'mmkv.default';
      const storage = mockStorages.get(id) ?? actual.createMMKV(config);

      mockStorages.set(id, storage);

      return storage;
    },
  };
});

// Loaded after the shared map exists: the storage module creates MMKV instances.
const { storageKeys } =
  jest.requireActual<typeof import('$infra/storage')>('$infra/storage');
const { appPreferences, id } = storageKeys.storeStorage;

const getStorage = () => createMMKV({ id });

const getPersistedPreferences = (): unknown => {
  const value = getStorage().getString(appPreferences);

  return value === undefined ? undefined : JSON.parse(value);
};

// Seed storage as a previous launch would have left it, then load the store.
getStorage().set(appPreferences, JSON.stringify({ appTheme: 'light' }));

const {
  setAppTheme,
  setIsBootstrappingApplication,
  useAppTheme,
  useIsBootstrappingApplication,
} = jest.requireActual<typeof import('../app.store')>('../app.store');
const { resetStore } =
  jest.requireActual<typeof import('../../utils')>('../../utils');

const useAppStoreValues = () => ({
  appTheme: useAppTheme(),
  isBootstrappingApplication: useIsBootstrappingApplication(),
});

// Tests run in order: the first one asserts the state right after launch.
describe('app store', () => {
  it('restores persisted preferences on launch', () => {
    const { result } = renderHook(useAppStoreValues);

    expect(result.current).toEqual({
      appTheme: 'light',
      isBootstrappingApplication: true,
    });
  });

  it('re-renders subscribers and persists only preferences', async () => {
    const { result } = renderHook(useAppStoreValues);

    act(() => {
      setIsBootstrappingApplication(false);
      setAppTheme('dark');
    });

    expect(result.current).toEqual({
      appTheme: 'dark',
      isBootstrappingApplication: false,
    });
    await waitFor(() =>
      expect(getPersistedPreferences()).toEqual({ appTheme: 'dark' }),
    );
  });

  it('resets values and overwrites persisted preferences with defaults', async () => {
    const { result } = renderHook(useAppStoreValues);

    act(() => {
      setIsBootstrappingApplication(true);
      setAppTheme('light');
    });
    await waitFor(() =>
      expect(getPersistedPreferences()).toEqual({ appTheme: 'light' }),
    );

    act(() => {
      resetStore();
    });

    expect(result.current).toEqual({
      appTheme: 'dark',
      isBootstrappingApplication: false,
    });
    await waitFor(() =>
      expect(getPersistedPreferences()).toEqual({ appTheme: 'dark' }),
    );
  });
});

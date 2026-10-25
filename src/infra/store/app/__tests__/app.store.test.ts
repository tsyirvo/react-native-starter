import * as React from 'react';
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

// Isolate the store and persistence registry, but share the renderer's React.
jest.doMock('react', () => React);
let appStore: typeof import('../app.store');
let resetStore: typeof import('../../utils').resetStore;

const useAppStoreValues = () => ({
  appTheme: appStore.useAppTheme(),
  isBootstrappingApplication: appStore.useIsBootstrappingApplication(),
});

describe('app store', () => {
  beforeEach(() => {
    mockStorages.clear();
    getStorage().set(appPreferences, JSON.stringify({ appTheme: 'light' }));

    jest.isolateModules(() => {
      appStore =
        jest.requireActual<typeof import('../app.store')>('../app.store');
      ({ resetStore } =
        jest.requireActual<typeof import('../../utils')>('../../utils'));
    });
  });
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
      appStore.setIsBootstrappingApplication(false);
      appStore.setAppTheme('dark');
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
      appStore.setIsBootstrappingApplication(true);
      appStore.setAppTheme('light');
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

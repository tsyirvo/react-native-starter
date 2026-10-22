import { batch, observable } from '@legendapp/state';
import { useValue } from '@legendapp/state/react';
import { syncObservable } from '@legendapp/state/sync';

import { storageKeys } from '$infra/storage';

import { createPersistOptions, registerStoreReset } from '../utils';
import type { AppPreferences, AppState, AppTheme } from './app.types';

const initialAppState: AppState = {
  isBootstrappingApplication: true,
};

const initialAppPreferences: AppPreferences = {
  appTheme: 'dark',
};

// Transient state is kept apart from persisted preferences so it is never saved.
const appState$ = observable<AppState>({ ...initialAppState });
const appPreferences$ = observable<AppPreferences>({
  ...initialAppPreferences,
});

syncObservable(
  appPreferences$,
  createPersistOptions<AppPreferences>(storageKeys.storeStorage.appPreferences),
);

// Persisted writes are queued, so `clearPersist` would be undone by the reset
// write; overwriting with defaults leaves none of the previous user's values.
registerStoreReset(() => {
  batch(() => {
    appState$.set({ ...initialAppState, isBootstrappingApplication: false });
    appPreferences$.set({ ...initialAppPreferences });
  });
});

export const useIsBootstrappingApplication = () =>
  useValue(appState$.isBootstrappingApplication);

export const useAppTheme = () => useValue(appPreferences$.appTheme);

export const setIsBootstrappingApplication = (
  isBootstrappingApplication: boolean,
) => {
  appState$.isBootstrappingApplication.set(isBootstrappingApplication);
};

export const setAppTheme = (appTheme: AppTheme) => {
  appPreferences$.appTheme.set(appTheme);
};

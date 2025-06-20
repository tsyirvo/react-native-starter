import type { StateCreator } from 'zustand';

import type { StoreState } from '../../types/store.types';
import { sliceResetFns } from '../../utils/resetStore';

import type { AppSlice, AppState } from './app.types';

const initialAppState: AppState = {
  appTheme: 'dark',
  isBootstrappingAuthentication: true,
};

export const createAppSlice: StateCreator<
  StoreState,
  [['zustand/immer', never], never],
  [],
  AppSlice
> = (set) => {
  sliceResetFns.add(() => {
    set({
      ...initialAppState,
      isBootstrappingAuthentication: false,
    });
  });

  return {
    ...initialAppState,
    setAppTheme: (appTheme) => {
      set({ appTheme });
    },
    setIsBootstrappingAuthentication: (isBootstrappingAuthentication) => {
      set({ isBootstrappingAuthentication });
    },
  };
};

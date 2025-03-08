import type { StateCreator } from 'zustand';

import type { StoreState } from '../../types/store.types';
import { sliceResetFns } from '../../utils/resetStore';

import type { AppSlice, AppState } from './app.types';

const initialAppState: AppState = {
  appTheme: 'dark',
};

export const createAppSlice: StateCreator<
  StoreState,
  [['zustand/immer', never], never],
  [],
  AppSlice
> = (set) => {
  sliceResetFns.add(() => {
    set(initialAppState);
  });

  return {
    ...initialAppState,
    setAppTheme: (appTheme) => {
      set({ appTheme });
    },
  };
};

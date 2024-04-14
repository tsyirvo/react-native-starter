import type { StateCreator } from 'zustand';

import type { StoreState } from '../../types/store.types';
import { sliceResetFns } from '../../utils/resetStore';

import type { SessionSlice, SessionState } from './session.types';

const initialSesionState: SessionState = {
  isUserLoggedIn: false,
};

export const createSessionSlice: StateCreator<
  StoreState,
  [['zustand/immer', never], never],
  [],
  SessionSlice
> = (set) => {
  sliceResetFns.add(() => {
    set(initialSesionState);
  });

  return {
    ...initialSesionState,
    setIsUserLoggedIn: (isUserLoggedIn) => {
      set({ isUserLoggedIn });
    },
  };
};

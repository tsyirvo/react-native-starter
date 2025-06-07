type AppTheme = 'dark' | 'light';

export interface AppState {
  appTheme: AppTheme;
}

interface AppActions {
  setAppTheme: (appTheme: AppTheme) => void;
}

export type AppSlice = AppState & AppActions;

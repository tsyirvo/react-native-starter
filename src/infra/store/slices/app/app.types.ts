type AppTheme = 'dark' | 'light';

export interface AppState {
  appTheme: AppTheme;
  isBootstrappingApplication: boolean;
}

interface AppActions {
  setAppTheme: (appTheme: AppTheme) => void;
  setIsBootstrappingApplication: (isBootstrappingApplication: boolean) => void;
}

export type AppSlice = AppState & AppActions;

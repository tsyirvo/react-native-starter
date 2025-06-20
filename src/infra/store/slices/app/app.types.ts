type AppTheme = 'dark' | 'light';

export interface AppState {
  appTheme: AppTheme;
  isBootstrappingAuthentication: boolean;
}

interface AppActions {
  setAppTheme: (appTheme: AppTheme) => void;
  setIsBootstrappingAuthentication: (
    isBootstrappingAuthentication: boolean,
  ) => void;
}

export type AppSlice = AppState & AppActions;

type AppTheme = 'dark' | 'light';

export type AppState = {
  appTheme: AppTheme;
};

type AppActions = {
  setAppTheme: (appTheme: AppTheme) => void;
};

export type AppSlice = AppState & AppActions;

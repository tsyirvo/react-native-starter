export type AppTheme = 'dark' | 'light';

export interface AppState {
  isBootstrappingApplication: boolean;
}

export interface AppPreferences {
  appTheme: AppTheme;
}

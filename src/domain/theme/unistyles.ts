import { StyleSheet } from 'react-native-unistyles';

import { darkTheme, lightTheme } from './themes';

/* ***** *****  Theme Configuration  ***** ***** */

type AppThemes = typeof appThemes;

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

StyleSheet.configure({
  themes: appThemes,
  settings: {
    adaptiveThemes: true,
  },
});

/* ***** *****  Module Augmentation  ***** ***** */

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}

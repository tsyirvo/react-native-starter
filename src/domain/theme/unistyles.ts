import { StyleSheet } from 'react-native-unistyles';

import { darkTheme, lightTheme } from './themes';

/* ***** *****  Theme Configuration  ***** ***** */

type AppThemes = typeof appThemes;

const appThemes = {
  dark: darkTheme,
  light: lightTheme,
};

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  themes: appThemes,
});

/* ***** *****  Module Augmentation  ***** ***** */

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

import type { lightTheme } from './themes';

/* ***** *****  Theme Types  ***** ***** */

export type ThemeColors = keyof typeof lightTheme.colors;
export type ThemeSpacing = keyof typeof lightTheme.spacing;
export type ThemeBorderRadii = keyof typeof lightTheme.borderRadii;
export type ThemeFontFamily = keyof typeof lightTheme.fontFamily;
export type ThemeFontSizes = keyof typeof lightTheme.fontSizes;
export type ThemeLineHeight = keyof typeof lightTheme.lineHeight;

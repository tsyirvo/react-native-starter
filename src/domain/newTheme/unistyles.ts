import { StyleSheet } from 'react-native-unistyles';

/* ***** *****  Shared Theme Values  ***** ***** */

const sharedSpacing = {
  zero: 0,
  spacing_4: 4,
  spacing_8: 8,
  spacing_12: 12,
  spacing_16: 16,
  spacing_24: 24,
  spacing_32: 32,
} as const;

const sharedBorderRadii = {
  radius_4: 4,
  radius_8: 8,
  radius_16: 16,
  radius_24: 24,
  radius_48: 48,
} as const;

const sharedFontFamily = {
  light: 'WorkSans-Light',
  regular: 'WorkSans-Regular',
  medium: 'WorkSans-Medium',
  bold: 'WorkSans-Bold',
} as const;

const sharedFontSizes = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 24,
  xLarge: 32,
} as const;

const sharedLineHeight = {
  small: 15,
  regular: 17,
  medium: 22,
  large: 29,
  xLarge: 38,
} as const;

const sharedGeneralColors = {
  clear: '#FFFFFF',
  clear_80: 'rgba(255, 255, 255, 0.8)',
  clear_50: 'rgba(255, 255, 255, 0.5)',
  clear_20: 'rgba(255, 255, 255, 0.2)',
  dark: '#1C202A',
  dark_80: 'rgba(28, 32, 42, 0.8)',
  dark_50: 'rgba(28, 32, 42, 0.5)',
  dark_20: 'rgba(28, 32, 42, 0.2)',
} as const;

const sharedGap = (v: number) => v * 4;

/* ***** *****  Light Theme  ***** ***** */

const lightTheme = {
  colors: {
    // Core colors
    core_primary: '#0085ff',
    core_secondary: '#69b4ff',
    core_tertiary: '#e0ffff',
    // Content colors
    content_primary: '#0C0D0F',
    content_secondary: '#5D5F6D',
    content_tertiary: '#A4A5A9',
    // Background colors
    bg_base: '#FFFFFF',
    bg_muted: '#F3F4F6',
    // Semantic colors
    positive: '#2a9d8f',
    neutral: '#e9c46a',
    negative: '#ef233c',
    // Border colors
    border_default: '#E5E7EB',
    border_focus: '#565FD9',
    // General colors
    ...sharedGeneralColors,
  },
  spacing: sharedSpacing,
  borderRadii: sharedBorderRadii,
  fontFamily: sharedFontFamily,
  fontSizes: sharedFontSizes,
  lineHeight: sharedLineHeight,
  gap: sharedGap,
} as const;

/* ***** *****  Dark Theme  ***** ***** */

const darkTheme = {
  colors: {
    // Core colors - slightly adjusted for dark mode
    core_primary: '#4DA3FF',
    core_secondary: '#69b4ff',
    core_tertiary: '#2A5A7A',
    // Content colors - inverted
    content_primary: '#FFFFFF',
    content_secondary: '#D1D2D6',
    content_tertiary: '#A4A5A9',
    // Background colors - inverted
    bg_base: '#1C202A',
    bg_muted: '#2A2E3A',
    // Semantic colors - slightly adjusted for dark backgrounds
    positive: '#3DBEA9',
    neutral: '#F5D480',
    negative: '#FF5A6E',
    // Border colors - adjusted for dark mode
    border_default: '#3A3E4A',
    border_focus: '#7B84E8',
    // General colors
    ...sharedGeneralColors,
  },
  spacing: sharedSpacing,
  borderRadii: sharedBorderRadii,
  fontFamily: sharedFontFamily,
  fontSizes: sharedFontSizes,
  lineHeight: sharedLineHeight,
  gap: sharedGap,
} as const;

/* ***** *****  Types  ***** ***** */

type AppThemes = typeof appThemes;

export type ThemeColors = keyof typeof lightTheme.colors;
export type ThemeSpacing = keyof typeof lightTheme.spacing;
export type ThemeBorderRadii = keyof typeof lightTheme.borderRadii;
export type ThemeFontFamily = keyof typeof lightTheme.fontFamily;
export type ThemeFontSizes = keyof typeof lightTheme.fontSizes;
export type ThemeLineHeight = keyof typeof lightTheme.lineHeight;

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}

/* ***** *****  Theme Configuration  ***** ***** */

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

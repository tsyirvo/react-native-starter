import {
  borderRadiiTokens,
  fontFamilyTokens,
  fontSizesTokens,
  gapTokens,
  generalColorsTokens,
  lineHeightTokens,
  spacingTokens,
} from './tokens';

/* ***** *****  Light Theme  ***** ***** */

export const lightTheme = {
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
    ...generalColorsTokens,
  },
  spacing: spacingTokens,
  borderRadii: borderRadiiTokens,
  fontFamily: fontFamilyTokens,
  fontSizes: fontSizesTokens,
  lineHeight: lineHeightTokens,
  gap: gapTokens,
} as const;

/* ***** *****  Dark Theme  ***** ***** */

export const darkTheme = {
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
    ...generalColorsTokens,
  },
  spacing: spacingTokens,
  borderRadii: borderRadiiTokens,
  fontFamily: fontFamilyTokens,
  fontSizes: fontSizesTokens,
  lineHeight: lineHeightTokens,
  gap: gapTokens,
} as const;

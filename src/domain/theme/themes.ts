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
  borderRadii: borderRadiiTokens,
  colors: {
    // Background colors
    bg_base: '#FFFFFF',
    bg_muted: '#F3F4F6',
    // Border colors
    border_default: '#E5E7EB',
    border_focus: '#565FD9',
    // Content colors
    content_primary: '#0C0D0F',
    content_secondary: '#5D5F6D',
    content_tertiary: '#A4A5A9',
    // Core colors
    core_primary: '#0085ff',
    core_secondary: '#69b4ff',
    core_tertiary: '#e0ffff',
    // Semantic colors
    negative: '#ef233c',
    neutral: '#e9c46a',
    positive: '#2a9d8f',
    // General colors
    ...generalColorsTokens,
  },
  fontFamily: fontFamilyTokens,
  fontSizes: fontSizesTokens,
  gap: gapTokens,
  lineHeight: lineHeightTokens,
  spacing: spacingTokens,
} as const;

/* ***** *****  Dark Theme  ***** ***** */

export const darkTheme = {
  borderRadii: borderRadiiTokens,
  colors: {
    // Background colors - inverted
    bg_base: '#1C202A',
    bg_muted: '#2A2E3A',
    // Border colors - adjusted for dark mode
    border_default: '#3A3E4A',
    border_focus: '#7B84E8',
    // Content colors - inverted
    content_primary: '#FFFFFF',
    content_secondary: '#D1D2D6',
    content_tertiary: '#A4A5A9',
    // Core colors - slightly adjusted for dark mode
    core_primary: '#4DA3FF',
    core_secondary: '#69b4ff',
    core_tertiary: '#2A5A7A',
    // Semantic colors - slightly adjusted for dark backgrounds
    negative: '#FF5A6E',
    neutral: '#F5D480',
    positive: '#3DBEA9',
    // General colors
    ...generalColorsTokens,
  },
  fontFamily: fontFamilyTokens,
  fontSizes: fontSizesTokens,
  gap: gapTokens,
  lineHeight: lineHeightTokens,
  spacing: spacingTokens,
} as const;

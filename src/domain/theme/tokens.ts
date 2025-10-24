/* ***** *****  Shared Theme Tokens  ***** ***** */

export const spacingTokens = {
  zero: 0,
  spacing_4: 4,
  spacing_8: 8,
  spacing_12: 12,
  spacing_16: 16,
  spacing_24: 24,
  spacing_32: 32,
} as const;

export const borderRadiiTokens = {
  radius_4: 4,
  radius_8: 8,
  radius_16: 16,
  radius_24: 24,
  radius_48: 48,
} as const;

export const fontFamilyTokens = {
  light: 'WorkSans-Light',
  regular: 'WorkSans-Regular',
  medium: 'WorkSans-Medium',
  bold: 'WorkSans-Bold',
} as const;

export const fontSizesTokens = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 24,
  xLarge: 32,
} as const;

export const lineHeightTokens = {
  small: 15,
  regular: 17,
  medium: 22,
  large: 29,
  xLarge: 38,
} as const;

export const generalColorsTokens = {
  clear: '#FFFFFF',
  clear_80: 'rgba(255, 255, 255, 0.8)',
  clear_50: 'rgba(255, 255, 255, 0.5)',
  clear_20: 'rgba(255, 255, 255, 0.2)',
  dark: '#1C202A',
  dark_80: 'rgba(28, 32, 42, 0.8)',
  dark_50: 'rgba(28, 32, 42, 0.5)',
  dark_20: 'rgba(28, 32, 42, 0.2)',
} as const;

export const gapTokens = (v: number) => v * 4;

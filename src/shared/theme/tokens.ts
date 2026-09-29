/* ***** *****  Shared Theme Tokens  ***** ***** */

export const spacingTokens = {
  spacing_4: 4,
  spacing_8: 8,
  spacing_12: 12,
  spacing_16: 16,
  spacing_24: 24,
  spacing_32: 32,
  zero: 0,
} as const;

export const borderRadiiTokens = {
  radius_4: 4,
  radius_8: 8,
  radius_16: 16,
  radius_24: 24,
  radius_48: 48,
} as const;

export const fontFamilyTokens = {
  bold: 'WorkSans-Bold',
  light: 'WorkSans-Light',
  medium: 'WorkSans-Medium',
  regular: 'WorkSans-Regular',
} as const;

export const fontSizesTokens = {
  large: 24,
  medium: 16,
  regular: 14,
  small: 12,
  xLarge: 32,
} as const;

export const lineHeightTokens = {
  large: 29,
  medium: 22,
  regular: 17,
  small: 15,
  xLarge: 38,
} as const;

export const generalColorsTokens = {
  clear: '#FFFFFF',
  clear_20: 'rgba(255, 255, 255, 0.2)',
  clear_50: 'rgba(255, 255, 255, 0.5)',
  clear_80: 'rgba(255, 255, 255, 0.8)',
  dark: '#1C202A',
  dark_20: 'rgba(28, 32, 42, 0.2)',
  dark_50: 'rgba(28, 32, 42, 0.5)',
  dark_80: 'rgba(28, 32, 42, 0.8)',
} as const;

export const gapTokens = (v: number) => v * 4;

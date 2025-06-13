const globalSpacing = {
  zero: 0,
  spacing_4: 4,
  spacing_8: 8,
  spacing_12: 12,
  spacing_16: 16,
  spacing_24: 24,
  spacing_32: 32,
};

const iosSpacing = {};

const androidSpacing = {};

export const spacing = {
  ...globalSpacing,
  ...iosSpacing,
  ...androidSpacing,
};

export type Spacing = keyof typeof spacing;

const globalSpacing = {
  zero: 0,
  global_8: 8,
  global_16: 16,
  global_24: 24,
  global_32: 32,
};

const iosSpacing = {};

const androidSpacing = {};

const spacing = {
  ...globalSpacing,
  ...iosSpacing,
  ...androidSpacing,
};

export type Spacing = keyof typeof spacing;

export default spacing;

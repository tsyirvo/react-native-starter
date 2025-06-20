const globalRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_16: 16,
  radius_24: 24,
  radius_48: 48,
};

const iosRadius = {};

const androidRadius = {};

export const borderRadii = {
  ...globalRadius,
  ...iosRadius,
  ...androidRadius,
};

export type BorderRadii = keyof typeof borderRadii;

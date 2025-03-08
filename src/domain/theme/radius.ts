const globalRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_16: 16,
};

const iosRadius = {};

const androidRadius = {};

export const borderRadii = {
  ...globalRadius,
  ...iosRadius,
  ...androidRadius,
};

export type BorderRadii = keyof typeof borderRadii;

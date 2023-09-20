const globalRadius = {
  global_4: 4,
  global_8: 8,
  global_16: 16,
};

const iosRadius = {};

const androidRadius = {};

export const borderRadii = {
  ...globalRadius,
  ...iosRadius,
  ...androidRadius,
};

export type BorderRadii = keyof typeof borderRadii;

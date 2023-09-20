const brandColors = {};

const colorPalette = {
  grey: '#e5e5e5',
  blue: '#457b9d',
  green: '#2a9d8f',
  yellow: '#e9c46a',
  red: '#ef233c',
};

const generalColors = {
  black: '#000',
  white: '#fff',
};

export const colors = {
  ...generalColors,
  ...colorPalette,
  ...brandColors,
};

export type Colors = keyof typeof colors;

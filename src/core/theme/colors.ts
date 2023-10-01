const primaryColors = {
  primary_100: '#0A6EBD',
  primary_80: '#5A96E3',
  primary_60: '#A1C2F1',
};

const secondaryColors = {
  secondary_100: '#DAC0A3',
  secondary_80: '#EADBC8',
  secondary_60: '#F8F0E5',
};

const semanticColors = {
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
  ...semanticColors,
  ...primaryColors,
  ...secondaryColors,
};

export type Colors = keyof typeof colors;

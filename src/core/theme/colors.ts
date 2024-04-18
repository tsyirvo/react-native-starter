const primaryColors = {
  primary_clear: '#0085ff',
  primary_dull: '#69b4ff',
  primary_visible: '#e0ffff',
};

const accentColors = {
  accent_clear: '#006fff',
  accent_dull: '#e1ffff',
};

const backgroundColors = {
  bg: '#1E1E1E',
  bg_focus: '#2d2d2d',
};

const semanticColors = {
  positive: '#2a9d8f',
  neutral: '#e9c46a',
  negative: '#ef233c',
};

const generalColors = {
  clear: '#FFFFFF',
  dull: '#9e9e9e',
  duller: '#454545',
};

export const colors = {
  ...generalColors,
  ...semanticColors,
  ...backgroundColors,
  ...primaryColors,
  ...accentColors,
};

export type Colors = keyof typeof colors;

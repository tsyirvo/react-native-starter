const coreColors = {
  core_primary: '#0085ff',
  core_secondary: '#69b4ff',
  core_tertiary: '#e0ffff',
};

const contentColors = {
  content_primary: '#0C0D0F',
  content_secondary: '#5D5F6D',
  content_tertiary: '#A4A5A9',
};

const backgroundColors = {
  bg_base: '#FFFFFF',
  bg_muted: '#F3F4F6',
};

const semanticColors = {
  positive: '#2a9d8f',
  neutral: '#e9c46a',
  negative: '#ef233c',
};

const borderColors = {
  border_default: '#E5E7EB',
  border_focus: '#565FD9',
};

const generalColors = {
  clear: '#FFFFFF',
  clear_80: 'rgba(255, 255, 255, 0.8)',
  clear_50: 'rgba(255, 255, 255, 0.5)',
  clear_20: 'rgba(255, 255, 255, 0.2)',
  dark: '#1C202A',
  dark_80: 'rgba(28, 32, 42, 0.8)',
  dark_50: 'rgba(28, 32, 42, 0.5)',
  dark_20: 'rgba(28, 32, 42, 0.2)',
};

export const colors = {
  ...generalColors,
  ...borderColors,
  ...semanticColors,
  ...backgroundColors,
  ...contentColors,
  ...coreColors,
};

export type Colors = keyof typeof colors;

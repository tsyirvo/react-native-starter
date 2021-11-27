const brandColors = {};

const theme = {
  colors: {
    ...brandColors,
    black: '#000',
    white: '#fff',
    grey: '#e5e5e5',
    blue: '#457b9d',
    green: '#2a9d8f',
    yellow: '#e9c46a',
    red: '#ef233c',
  },
  space: {
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
  fonts: {
    ios: 'San Francisco',
    android: 'Roboto',
  },
  fontSizes: {
    small: 12,
    medium: 14,
    regular: 16,
    large: 24,
    xLarge: 32,
  },
  radii: {
    small: 4,
    regular: 8,
    medium: 16,
  },
};

export type Theme = typeof theme;

export default theme;

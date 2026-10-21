/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/app.config.ts',
    '!**/**.e2e.ts',
    '!src/components/icons/components/**',
    '!**/stories/**',
    '!**/**.types.ts',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^\\$(.*)$': '<rootDir>/src/$1',
  },
  preset: 'jest-expo',
  resolver: 'react-native-reanimated/jest/resolver',
  setupFiles: [
    'react-native-gesture-handler/jestSetup.js',
    'react-native-unistyles/mocks',
    './src/shared/theme/unistyles.ts',
    './src/testing/setup.ts',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', 'e2e/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|standard-navigation|@sentry/react-native|native-base|react-native-svg|zustand|immer|storybook|@storybook/.*)',
  ],
};

export default config;

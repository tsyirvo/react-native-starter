import { availableParallelism } from 'node:os';

/** @type {import('jest').Config} */
const config = {
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'scripts/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/__tests__/**',
    '!**/*.{test,spec}.{ts,tsx}',
    '!**/*.e2e.ts',
    '!src/shared/icons/components/**',
    '!src/testing/**',
    '!**/stories/**',
    '!**/*.types.ts',
  ],
  // Benchmarks plateau at 4–8 workers; leave CPU headroom and cap pool startup cost.
  maxWorkers: Math.max(1, Math.min(6, Math.floor(availableParallelism() / 2))),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^\\$(.*)$': '<rootDir>/src/$1',
  },
  passWithNoTests: false,
  preset: 'jest-expo',
  resolver: 'react-native-reanimated/jest/resolver',
  setupFiles: [
    'react-native-gesture-handler/jestSetup.js',
    'react-native-unistyles/mocks',
    './src/shared/theme/unistyles.ts',
    './src/testing/setup.ts',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  // Expo's dependency allowlist plus Storybook's ESM packages used by composeStories.
  // Preserve the preset's exclusions for Babel/Reanimated plugin internals.
  transformIgnorePatterns: [
    '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|standard-navigation|storybook|@storybook))',
    '/node_modules/react-native-reanimated/plugin/',
    '/node_modules/@react-native/babel-preset/',
  ],
};

export default config;

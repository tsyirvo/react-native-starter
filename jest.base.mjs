import { availableParallelism } from 'node:os';

// jest-expo's own list, plus Storybook for composeStories. Each entry matches a package name prefix.
const TRANSFORM_PACKAGES = [
  'react-native',
  '@react-native',
  '@react-native-community',
  'expo',
  '@expo',
  '@expo-google-fonts',
  'react-navigation',
  '@react-navigation',
  '@sentry/react-native',
  'standard-navigation',
  'storybook',
  '@storybook',
];

// A repo key with the same name replaces the whole value. A repo config spreads these lists.
export const transformIgnorePatterns = (packages = []) => [
  `/node_modules/(?!(${[...TRANSFORM_PACKAGES, ...packages].join('|')}))`,
  '/node_modules/react-native-reanimated/plugin/',
  '/node_modules/@react-native/babel-preset/',
];

export const SETUP_FILES = [
  'react-native-gesture-handler/jestSetup.js',
  'react-native-unistyles/mocks',
];

/** @type {import('jest').Config} */
const config = {
  preset: 'jest-expo',
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: false,
  // Jest's default, capped. Above 8 workers, the suites get no faster.
  maxWorkers: Math.min(8, availableParallelism() - 1),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  // expo run writes the native projects here. Jest must not crawl them or run the tests they contain.
  modulePathIgnorePatterns: ['<rootDir>/ios/', '<rootDir>/android/'],
  setupFiles: SETUP_FILES,
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  transformIgnorePatterns: transformIgnorePatterns(),
};

export default config;

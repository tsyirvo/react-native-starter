import base, { SETUP_FILES } from './jest.base.mjs';

/** @type {import('jest').Config} */
const config = {
  ...base,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'scripts/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/__tests__/**',
    '!**/*.{test,spec}.{ts,tsx}',
    '!**/*.e2e.ts',
    '!src/testing/**',
    '!**/stories/**',
    '!**/*.types.ts',
  ],
  moduleNameMapper: {
    '^\\$(.*)$': '<rootDir>/src/$1',
  },
  resolver: 'react-native-reanimated/jest/resolver',
  setupFiles: [
    ...SETUP_FILES,
    '<rootDir>/src/shared/theme/unistyles.ts',
    '<rootDir>/src/testing/setup.ts',
  ],
};

export default config;

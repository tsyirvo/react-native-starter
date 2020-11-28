module.exports = {
  cacheDirectory: '.jest/cache',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^styled-components$':
      '<rootDir>/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
    '$assets(.*)$': '<rootDir>/src/components/assets/$1',
    '$components(.*)$': '<rootDir>/src/components/components/$1',
    '$shared(.*)$': '<rootDir>/src/components/shared/$1',
    '$pages(.*)$': '<rootDir>/src/pages/$1',
    '$routes(.*)$': '<rootDir>/src/routes/$1',
    '$styles(.*)$': '<rootDir>/src/styles/$1',
    '$utils(.*)$': '<rootDir>/src/utils/$1',
    '$tests(.*)$': '<rootDir>/src/tests/$1',
  },
  preset: 'react-native',
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setupTests.ts',
    '@testing-library/jest-native/extend-expect',
  ],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/', 'e2e/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};

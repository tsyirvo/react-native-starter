const externalDependencies = [
  'react-native',
  'react-navigation',
  'react-navigation-stack',
  'react-native-screens',
];

module.exports = {
  cacheDirectory: '.jest/cache',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^styled-components$':
      '<rootDir>/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
    '@assets(.*)$': '<rootDir>/src/components/assets/$1',
    '@components(.*)$': '<rootDir>/src/components/components/$1',
    '@shared(.*)$': '<rootDir>/src/components/shared/$1',
    '@pages(.*)$': '<rootDir>/src/pages/$1',
    '@types(.*)$': '<rootDir>/src/types/$1',
    '@routes(.*)$': '<rootDir>/src/routes/$1',
    '@styles(.*)$': '<rootDir>/src/styles/$1',
    '@utils(.*)$': '<rootDir>/src/utils/$1',
    '@tests(.*)$': '<rootDir>/src/tests/$1',
  },
  preset: 'react-native',
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setupTests.js',
    '@testing-library/jest-native/extend-expect',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@?react-navigation)',
  ],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  // This is needed to have a global window object in our tests
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/', 'e2e/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};

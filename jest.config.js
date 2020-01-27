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
  },
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  // This is needed to have a global window object in our tests
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    `node_modules/(?!(${externalDependencies.join('|')})/)`,
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
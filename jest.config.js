const externalDependencies = [
  'react-native',
  'react-navigation',
  'react-navigation-stack',
  'react-native-screens',
];

module.exports = {
  cacheDirectory: '.jest/cache',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '^styled-components$':
      '<rootDir>/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
  },
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  // This is needed to have a global window object in our tests
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  transformIgnorePatterns: [
    `node_modules/(?!(${externalDependencies.join('|')})/)`,
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};

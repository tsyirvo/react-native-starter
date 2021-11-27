module.exports = {
  cacheDirectory: '.jest/cache',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^styled-components$':
      '<rootDir>/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
  },
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/', 'e2e/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};

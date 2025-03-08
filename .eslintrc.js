module.exports = {
  extends: ['tsyirvo-react-native'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    '__mocks__',
    'metro.config.js',
    '.eslintrc.js',
    'src/components/icons/components/',
    '**/*.json',
    '!src/core/i18n/resources/**/*.json',
  ],
};

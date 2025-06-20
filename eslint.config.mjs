import tsyirvoReactNative from 'eslint-config-tsyirvo-react-native';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: [
      '**/__mocks__/**',
      'metro.config.js',
      'babel.config.js',
      'src/shared/icons/svgs/config/icon-template.js',
      'src/components/icons/components/**',
      '!src/core/i18n/resources/**/*.json',
      '**/*.json',
      '.storybook/*',
      '*.app',
      '*.ipa',
      '*.apk',
      '*.aab',
      '.yarn/*',
    ],
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...tsyirvoReactNative,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/ignore': ['react-native'],
    },
  },
];

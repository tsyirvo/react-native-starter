import tsyirvoReactNative from 'eslint-config-tsyirvo-react-native';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: [
      'metro.config.cjs',
      'babel.config.js',
      'env.js',
      'src/shared/icons/svgs/config/icon-template.js',
      '**/*.json',
      '.rnstorybook/*',
      '*.app',
      '*.ipa',
      '*.apk',
      '*.aab',
      '.yarn/*',
      'dist/*',
    ],
  },
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

import tsyirvoReactNative from 'eslint-config-tsyirvo-react-native';
import path from 'path';
import { fileURLToPath } from 'url';
import reactCompiler from 'eslint-plugin-react-compiler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: [
      'metro.config.cjs',
      'babel.config.js',
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...tsyirvoReactNative,
  reactCompiler.configs.recommended,
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

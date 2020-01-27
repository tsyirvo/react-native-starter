module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@shared': './src/components/shared',
          '@pages': './src/pages',
          '@types': './src/types',
          '@routes': './src/routes',
          '@styles': './src/styles',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};

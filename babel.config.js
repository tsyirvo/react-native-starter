module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: 'src',
            rootPathPrefix: '$',
          },
        ],
      },
    ],
    'lodash',
    'react-native-reanimated/plugin',
  ],
};

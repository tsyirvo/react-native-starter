module.exports = function (api) {
  // eslint-disable-next-line
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
    plugins: [
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
      'react-native-reanimated/plugin',
    ],
  };
};

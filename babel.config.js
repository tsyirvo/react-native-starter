/* eslint-disable */

module.exports = function (api) {
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
      'lodash',
      'react-native-reanimated/plugin',
    ],
  };
};

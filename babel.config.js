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
    plugins: ['react-native-reanimated/plugin'],
  };
};

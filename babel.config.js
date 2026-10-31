export default function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-worklets/plugin',
      ['react-native-unistyles/plugin', { root: 'src' }],
    ],
  };
}

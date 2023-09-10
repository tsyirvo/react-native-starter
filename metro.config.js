// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = (async () => {
  const {
    transformer,
    resolver: { sourceExts, assetExts, ...resolver },
    ...defaultConfig
  } = await getDefaultConfig(__dirname);

  return {
    ...defaultConfig,
    resolver: {
      ...resolver,
      sourceExts: [...sourceExts, 'mjs'],
    },
  };
})();

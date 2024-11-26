// Learn more https://docs.expo.io/guides/customizing-metro
// This replaces `const { getDefaultConfig } = require('expo/metro-config');`
const path = require('path');

const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

// This replaces `const config = getDefaultConfig(__dirname);`
const config = getSentryExpoConfig(__dirname);

module.exports = withStorybook(config, {
  enabled: process.env.STORYBOOK_ENABLED === 'true',
  onDisabledRemoveStorybook: true,
  websockets: {
    port: 7007,
    host: 'localhost',
  },
});

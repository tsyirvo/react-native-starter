// Learn more https://docs.expo.io/guides/customizing-metro
// This replaces `const { getDefaultConfig } = require('expo/metro-config');`
const path = require('path');

const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const withStorybookConfig = require('@storybook/react-native/metro/withStorybookConfig');

// This replaces `const config = getDefaultConfig(__dirname);`
const config = getSentryExpoConfig(__dirname);

module.exports = withStorybookConfig(config, {
  removeStorybook: process.env.STORYBOOK_ENABLED !== 'true',
});

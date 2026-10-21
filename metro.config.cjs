// Learn more https://docs.expo.io/guides/customizing-metro
// This replaces `const { getDefaultConfig } = require('expo/metro-config');`
const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const {
  withStorybook,
} = require('@storybook/react-native/metro/withStorybook');

// This replaces `const config = getDefaultConfig(__dirname);`
const config = getSentryExpoConfig(__dirname);

module.exports = withStorybook(config, {
  // Never include Storybook in staging/production, even if the flag is set.
  enabled:
    process.env.APP_ENV === 'development' &&
    process.env.STORYBOOK_ENABLED === 'true',
});

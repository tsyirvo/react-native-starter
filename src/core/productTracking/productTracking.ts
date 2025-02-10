import type { PostHogOptions } from 'posthog-react-native';
import PostHog from 'posthog-react-native';

import { config } from '$core/constants';
import { CustomProductTrackingStorage } from '$core/storage';

const apiKey = config.posthogApiKey;
const options: PostHogOptions = {
  host: 'https://eu.i.posthog.com',
  disabled: config.isDebug,
  customStorage: CustomProductTrackingStorage,
};

export const productTrackingClient = new PostHog(apiKey, options);

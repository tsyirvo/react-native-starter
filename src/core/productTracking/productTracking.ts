import type { PostHogOptions } from 'posthog-react-native';
import PostHog from 'posthog-react-native';

import { config } from '$core/constants';
import { defaultFeatureFlags } from '$core/featureFlags/defaultFlags';
import { CustomProductTrackingStorage } from '$core/storage';

const apiKey = config.posthogApiKey;
const options: PostHogOptions = {
  host: 'https://us.i.posthog.com',
  disabled: config.isDebug,
  customStorage: CustomProductTrackingStorage,
  bootstrap: {
    featureFlags: defaultFeatureFlags,
  },
};

export const productTrackingClient = new PostHog(apiKey, options);

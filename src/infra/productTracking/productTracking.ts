import type { PostHogOptions } from 'posthog-react-native';
import PostHog from 'posthog-react-native';

import { config } from '$domain/constants';
import { defaultFeatureFlags } from '$infra/featureFlags/defaultFlags';
import { CustomProductTrackingStorage } from '$infra/storage';

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

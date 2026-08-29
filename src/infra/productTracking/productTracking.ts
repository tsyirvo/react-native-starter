import type { PostHogOptions } from 'posthog-react-native';
import PostHog from 'posthog-react-native';

import { config } from '$domain/constants';
import { defaultFeatureFlags } from '$infra/featureFlags/defaultFlags';
import { CustomProductTrackingStorage } from '$infra/storage';

const apiKey = config.posthogApiKey;
const options: PostHogOptions = {
  bootstrap: {
    featureFlags: defaultFeatureFlags,
  },
  customStorage: CustomProductTrackingStorage,
  disabled: config.isDebug,
  host: 'https://us.i.posthog.com',
};

export const productTrackingClient = new PostHog(apiKey, options);

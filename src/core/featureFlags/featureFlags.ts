import { productTrackingClient } from '$core/productTracking';

class FeatureFlagsClass {
  reloadFlags() {
    productTrackingClient.reloadFeatureFlags();
  }
}

export const FeatureFlags = new FeatureFlagsClass();

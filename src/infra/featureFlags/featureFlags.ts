import { productTrackingClient } from '$infra/productTracking';

class FeatureFlagsClass {
  reloadFlags() {
    productTrackingClient.reloadFeatureFlags();
  }
}

export const FeatureFlags = new FeatureFlagsClass();

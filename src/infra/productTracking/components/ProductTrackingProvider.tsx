import type { PostHogAutocaptureOptions } from 'posthog-react-native';
import { PostHogProvider } from 'posthog-react-native';
import type { ReactElement } from 'react';

import { productTrackingClient } from '../productTracking';

interface ProductTrackingProviderProps {
  children: ReactElement;
}

export const ProductTrackingProvider = ({
  children,
}: ProductTrackingProviderProps) => (
  <PostHogProvider
    autocapture={autocaptureOptions}
    client={productTrackingClient}
  >
    {children}
  </PostHogProvider>
);

const autocaptureOptions: PostHogAutocaptureOptions = {
  captureScreens: false,
  captureTouches: true,
};

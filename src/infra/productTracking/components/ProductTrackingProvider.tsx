import type { PostHogAutocaptureOptions } from 'posthog-react-native';
import { PostHogProvider } from 'posthog-react-native';
import type { ReactElement } from 'react';

import { productTrackingClient } from '../productTracking';

interface ProductTrackingProviderProps {
  children: ReactElement;
}

export const ProductTrackingProvider = ({
  children,
}: ProductTrackingProviderProps) => {
  return (
    <PostHogProvider
      client={productTrackingClient}
      autocapture={autocaptureOptions}
    >
      {children}
    </PostHogProvider>
  );
};

const autocaptureOptions: PostHogAutocaptureOptions = {
  captureTouches: true,
  captureScreens: false,
};

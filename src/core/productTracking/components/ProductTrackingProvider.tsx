import { PostHogProvider } from 'posthog-react-native';
import type { ReactElement } from 'react';

import { productTrackingClient } from '../productTracking';

type ProductTrackingProviderProps = {
  children: ReactElement;
};

export const ProductTrackingProvider = ({
  children,
}: ProductTrackingProviderProps) => {
  return (
    <PostHogProvider client={productTrackingClient} autocapture>
      {children}
    </PostHogProvider>
  );
};

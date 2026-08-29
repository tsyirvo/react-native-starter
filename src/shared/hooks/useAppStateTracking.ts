import { Analytics } from '$infra/analytics';
import { useAppState } from '$shared/hooks';

export const useAppStateTracking = () => {
  useAppState({
    onComingToForeground: () => {
      Analytics.trackEvent('app-put-in-foreground');
    },
    onGoingToBackground: () => {
      Analytics.trackEvent('app-put-in-background');
    },
  });
};

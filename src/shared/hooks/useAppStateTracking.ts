import { Analytics } from '$infra/analytics';
import { useAppState } from '$shared/hooks';

export const useAppStateTracking = () => {
  useAppState({
    onGoingToBackground: () => {
      Analytics.trackEvent('app-put-in-background');
    },
    onComingToForeground: () => {
      Analytics.trackEvent('app-put-in-foreground');
    },
  });
};

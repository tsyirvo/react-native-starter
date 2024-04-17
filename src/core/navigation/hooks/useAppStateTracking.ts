import { Analytics } from '$core/analytics';
import { useAppState } from '$shared/hooks/useAppState';

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

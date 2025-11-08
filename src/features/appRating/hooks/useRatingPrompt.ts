import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { useAppStoreReview } from '$features/storeRating/hooks/useAppStoreReview';
import { Analytics } from '$infra/analytics';
import { useAppStore } from '$infra/store';

export const useRatingPrompt = () => {
  const router = useRouter();

  const { isStoreReviewAvailable, requestStoreReview } = useAppStoreReview();

  const recordPromptShown = useAppStore((state) => state.recordPromptShown);
  const recordUserResponse = useAppStore((state) => state.recordUserResponse);

  useEffect(() => {
    recordPromptShown();

    Analytics.trackEvent('rating-prompt-viewed');
  }, [recordPromptShown]);

  const handleYesPress = async () => {
    recordUserResponse('yes');

    Analytics.trackEvent('rating-prompt-response-yes');

    const isAvailable = await isStoreReviewAvailable();

    if (!isAvailable) {
      Analytics.trackEvent('rating-modal-unavailable');

      router.back();

      return;
    }

    Analytics.trackEvent('rating-modal-shown');

    await requestStoreReview();
    router.back();
  };

  const handleNoPress = () => {
    recordUserResponse('no');
    router.push('/features/(appRating)/feedback');

    Analytics.trackEvent('rating-prompt-response-no');
  };

  return {
    handleYesPress,
    handleNoPress,
  };
};

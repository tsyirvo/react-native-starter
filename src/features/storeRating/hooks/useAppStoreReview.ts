import * as StoreReview from 'expo-store-review';

export const useAppStoreReview = () => {
  const isStoreReviewAvailable = async () => {
    const [isActionAvailable, isRequestAvailable] = await Promise.all([
      StoreReview.hasAction(),
      StoreReview.isAvailableAsync(),
    ]);

    return isActionAvailable && isRequestAvailable;
  };

  const requestStoreReview = async () => {
    await StoreReview.requestReview();
  };

  return {
    isStoreReviewAvailable,
    requestStoreReview,
  };
};

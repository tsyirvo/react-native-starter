import { Image as ExpoImage } from 'expo-image';

import { Logger } from '$core/logger';

export const preloadImages = (sources: string[]) => {
  ExpoImage.prefetch(sources).catch((error: unknown) => {
    Logger.error({
      message: 'Failed to preload images',
      error,
    });
  });
};

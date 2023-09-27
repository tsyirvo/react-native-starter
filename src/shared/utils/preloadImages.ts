import { Image as ExpoImage } from 'expo-image';

export const preloadImages = (sources: string[]) => {
  ExpoImage.prefetch(sources);
};

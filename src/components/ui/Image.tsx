import { Image as ExpoImage, ImageProps } from 'expo-image';
import React from 'react';

// eslint-disable-next-line react/jsx-props-no-spreading
const Image = (props: ImageProps) => <ExpoImage {...props} />;

export default Image;

export const preloadImages = (sources: string[]) => {
  ExpoImage.prefetch(sources);
};

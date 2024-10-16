import type { ImageProps } from 'expo-image';
import { Image as ExpoImage } from 'expo-image';

export const Image = (props: ImageProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ExpoImage {...props} />;
};

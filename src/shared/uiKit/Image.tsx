import type { ImageProps } from 'expo-image';
import { Image as ExpoImage } from 'expo-image';
import React from 'react';

export function Image(props: ImageProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ExpoImage {...props} />;
}

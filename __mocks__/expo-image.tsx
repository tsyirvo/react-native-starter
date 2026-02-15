import { View } from 'react-native';
import type { ImageProps } from 'expo-image';
import type { ViewProps } from 'react-native';

// Mock the Image component from expo-image
const Image = (props: ImageProps) => {
  return <View {...(props as ViewProps)} />;
};

export { Image };
export const prefetch = jest.fn();

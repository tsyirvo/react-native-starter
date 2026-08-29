import type { ImageProps } from 'expo-image';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

// Mock the Image component from expo-image
const Image = (props: ImageProps) => <View {...(props as ViewProps)} />;

export { Image };
export const prefetch = jest.fn();

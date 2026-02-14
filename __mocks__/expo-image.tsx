import type { ViewProps } from 'react-native';
import { View } from 'react-native';

// Mock the Image component from expo-image
const Image = (props: ViewProps) => {
  return <View {...props} />;
};

export { Image };
export const prefetch = jest.fn();

import { View } from 'react-native';

// Mock the Image component from expo-image
const Image = (props: any) => {
  return <View {...props} />;
};

export { Image };
export const prefetch = jest.fn();

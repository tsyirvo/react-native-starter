import React from 'react';
import { View } from 'react-native';

// Mock the Image component from expo-image
const Image = (props) => {
  return <View {...props} />;
};

module.exports = {
  Image,
  prefetch: jest.fn(),
};

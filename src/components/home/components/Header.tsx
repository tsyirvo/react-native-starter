import React from 'react';
import { ImageBackground } from 'react-native';

import { Flex, Text } from '$components/shared/primitives';

const uri = { uri: 'header' };
const styles = {
  width: '100%',
  height: 350,
};

const Header = () => (
  <ImageBackground source={uri} style={styles}>
    <Flex justifyContent="flex-end" alignItems="center" mb={25}>
      <Text testID="home_title" variant="large" color="white">
        React Native Starter
      </Text>
    </Flex>
  </ImageBackground>
);

export default Header;

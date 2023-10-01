/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ImageBackground, StyleSheet } from 'react-native';

import { Box, Text } from '$shared/uiKit/primitives';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
  },
});

export function Header() {
  return (
    <ImageBackground
      source={require('../../assets/images/header.jpeg')}
      style={styles.image}
    >
      <Box
        alignItems="center"
        flex={1}
        justifyContent="flex-end"
        mb="spacing_24"
      >
        <Text color="white" testID="home_title" variant="large">
          React Native Starter
        </Text>
      </Box>
    </ImageBackground>
  );
}

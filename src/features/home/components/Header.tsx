import { ImageBackground, StyleSheet } from 'react-native';

import { Box, Text } from '$shared/uiKit/primitives';

import headerAsset from '../../../assets/images/header.jpeg';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
  },
});

export const Header = () => {
  return (
    <ImageBackground source={headerAsset} style={styles.image}>
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
};

import { ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Assets } from '$assets';
import { Box, Text } from '$shared/uiKit';

export const Header = () => (
  <ImageBackground
    source={Assets.images.components.home.header}
    style={styles.image}
  >
    <Box align="center" justify="flex-end" mb="spacing_24">
      <Text color="core_primary" variant="large">
        React Native Template
      </Text>
    </Box>
  </ImageBackground>
);

const styles = StyleSheet.create({
  image: {
    height: 350,
    width: '100%',
  },
});

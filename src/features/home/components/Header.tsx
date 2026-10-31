import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Assets } from '$assets';
import { Image } from '$shared/uiKit/image';
import { Box, Text } from '$shared/uiKit/primitives';

export const Header = () => (
  <View style={styles.container}>
    <Image source={Assets.images.components.home.header} style={styles.image} />

    <Box align="center" justify="flex-end" mb="spacing_24">
      <Text color="core_primary" variant="large">
        React Native Template
      </Text>
    </Box>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: '100%',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
});

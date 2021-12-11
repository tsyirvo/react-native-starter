import { ImageBackground } from 'react-native';

import { Box, Text } from '$components/shared/primitives';

const uri = { uri: 'header' };
const styles = {
  width: '100%',
  height: 350,
};

const Header = () => (
  <ImageBackground source={uri} style={styles}>
    <Box flex={1} justifyContent="flex-end" alignItems="center" mb="global_24">
      <Text testID="home_title" variant="large" color="white">
        React Native Starter
      </Text>
    </Box>
  </ImageBackground>
);

export default Header;

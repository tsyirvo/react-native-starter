import { ImageBackground } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
import { makeAppStyles } from '$styles/theme';

const uri = { uri: 'header' };

const useStyles = makeAppStyles(() => ({
  image: {
    width: '100%',
    height: 350,
  },
}));

const Header = () => {
  const styles = useStyles();

  return (
    <ImageBackground source={uri} style={styles.image}>
      <Box
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
        mb="global_24"
      >
        <Text testID="home_title" variant="large" color="white">
          React Native Starter
        </Text>
      </Box>
    </ImageBackground>
  );
};

export default Header;

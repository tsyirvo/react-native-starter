import { ImageBackground } from 'react-native';

import { Box, Text } from '$components/ui/primitives';
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
        alignItems="center"
        flex={1}
        justifyContent="flex-end"
        mb="global_24"
      >
        <Text color="white" testID="home_title" variant="large">
          React Native Starter
        </Text>
      </Box>
    </ImageBackground>
  );
};

export default Header;

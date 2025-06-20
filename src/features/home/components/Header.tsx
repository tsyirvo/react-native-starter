import { ImageBackground } from 'react-native';

import headerAsset from '$assets/images/header.jpeg';
import { makeAppStyles } from '$domain/theme';
import { Box, Text } from '$shared/uiKit';

export const Header = () => {
  const styles = useStyles();

  return (
    <ImageBackground source={headerAsset} style={styles.image}>
      <Box
        alignItems="center"
        flex={1}
        justifyContent="flex-end"
        mb="spacing_24"
      >
        <Text color="core_primary" variant="large">
          React Native Template
        </Text>
      </Box>
    </ImageBackground>
  );
};

const useStyles = makeAppStyles(() => ({
  image: {
    width: '100%',
    height: 350,
  },
}));

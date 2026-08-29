import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const HeaderBackground = () => (
  <View style={styles.container}>
    <View style={styles.separator} />
  </View>
);

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.bg_base,
    height: '100%',
    width: '100%',
  },
  separator: {
    backgroundColor: theme.colors.border_default,
    bottom: 0,
    height: 1,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
}));

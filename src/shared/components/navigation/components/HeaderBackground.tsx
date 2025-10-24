import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const HeaderBackground = () => {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.bg_base,
  },
  separator: {
    backgroundColor: theme.colors.border_default,
    height: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
}));

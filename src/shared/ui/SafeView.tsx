import { StyleSheet } from 'react-native';
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from 'react-native-safe-area-context';

type SafeViewProps = NativeSafeAreaViewProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const SafeView = ({ children, edges = [] }: SafeViewProps) => (
  <SafeAreaView edges={edges} style={styles.container}>
    {children}
  </SafeAreaView>
);

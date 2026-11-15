import { StyleSheet } from 'react-native';
import type { NativeSafeAreaViewProps } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

type SafeViewProps = NativeSafeAreaViewProps;

export const SafeView = ({ edges = [], style, ...props }: SafeViewProps) => (
  <SafeAreaView edges={edges} style={[styles.container, style]} {...props} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

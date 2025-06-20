import { StyleSheet } from 'react-native';
import type { NativeSafeAreaViewProps } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

type SafeViewProps = NativeSafeAreaViewProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const SafeView = ({ children, edges = [] }: SafeViewProps) => {
  return (
    <SafeAreaView edges={edges} style={styles.container}>
      {children}
    </SafeAreaView>
  );
};

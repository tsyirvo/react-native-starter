import {
  SafeAreaView,
  NativeSafeAreaViewProps,
} from 'react-native-safe-area-context';

type Props = NativeSafeAreaViewProps;

const styles = { flex: 1 };

const SafeView = ({ children, edges }: Props) => (
  <SafeAreaView style={styles} edges={edges}>
    {children}
  </SafeAreaView>
);

export default SafeView;

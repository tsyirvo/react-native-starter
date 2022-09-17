import {
  SafeAreaView,
  NativeSafeAreaViewProps,
  Edge,
} from 'react-native-safe-area-context';

type Props = NativeSafeAreaViewProps;

const styles = { flex: 1 };

const defaultEdges: Edge[] = ['bottom'];

const SafeView = ({ children, edges = defaultEdges }: Props) => (
  <SafeAreaView edges={edges} style={styles}>
    {children}
  </SafeAreaView>
);

export default SafeView;

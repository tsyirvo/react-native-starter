import React, { ReactElement } from 'react';
import {
  SafeAreaView,
  NativeSafeAreaViewProps,
} from 'react-native-safe-area-context';

type Props = NativeSafeAreaViewProps;

const styles = { flex: 1 };

const SafeView = ({ children, ...rest }: Props): ReactElement => (
  <SafeAreaView style={styles} {...rest}>
    {children}
  </SafeAreaView>
);

export default SafeView;

import type { ReactNode } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { Edge } from 'react-native-safe-area-context';

import { SafeView } from './SafeView';

type ScreenProps = {
  edges?: Edge[];
  children: ReactNode;
};

export function Screen({ children, edges = [] }: ScreenProps) {
  return (
    <SafeView edges={edges}>
      <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
    </SafeView>
  );
}

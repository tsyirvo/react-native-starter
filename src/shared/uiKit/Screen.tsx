import type { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';

import { SafeView } from './SafeView';

type ScreenProps = {
  edges?: Edge[];
  children: ReactNode;
  isScrollable?: boolean;
};

export const Screen = ({
  children,
  edges = [],
  isScrollable = true,
}: ScreenProps) => {
  return (
    <SafeView edges={edges}>
      {isScrollable ? <ScrollView>{children}</ScrollView> : children}
    </SafeView>
  );
};

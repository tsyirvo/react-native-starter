import type { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';

import type { Colors, Spacing } from '$core/theme';

import { Box } from './primitives';
import { SafeView } from './SafeView';

type ScreenProps = {
  edges?: Edge[];
  children: ReactNode;
  isScrollable?: boolean;
  bg?: Colors;
  p?: Spacing;
};

export const Screen = ({
  children,
  edges = [],
  isScrollable = true,
  bg = 'bg',
  p = 'spacing_16',
}: ScreenProps) => {
  return (
    <SafeView edges={edges}>
      <Box bg={bg} flex={1} p={p}>
        {isScrollable ? <ScrollView>{children}</ScrollView> : children}
      </Box>
    </SafeView>
  );
};

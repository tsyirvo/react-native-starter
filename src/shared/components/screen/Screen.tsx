import type { ReactNode } from 'react';
import type { Edge } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import type { ThemeColors, ThemeSpacing } from '$domain/theme';
import { Box, SafeView } from '$shared/uiKit';

interface ScreenProps {
  bg?: ThemeColors;
  children: ReactNode;
  edges?: Edge[];
  px?: ThemeSpacing;
  py?: ThemeSpacing;
  testID?: string;
}

export const Screen = ({
  children,
  edges = [],
  bg = 'bg_base',
  px = 'zero',
  py = 'zero',
  testID = 'Screen',
}: ScreenProps) => (
  <Box px={px} py={py} style={styles.container(bg)} testID={testID}>
    <SafeView edges={edges} style={styles.wrapper}>
      {children}
    </SafeView>
  </Box>
);

const styles = StyleSheet.create((theme) => ({
  container: (bg: ThemeColors) => ({
    backgroundColor: theme.colors[bg],
  }),
  wrapper: {
    flex: 1,
  },
}));

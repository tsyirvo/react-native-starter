import type { ReactNode } from 'react';
import type { Edge } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import type { ThemeColors } from '$domain/newTheme/unistyles';
import { makeAppStyles, type Colors, type Spacing } from '$domain/theme';
import { Box, SafeView } from '$shared/uiKit';

interface ScreenProps {
  edges?: Edge[];
  children: ReactNode;
  bg?: Colors;
  px?: Spacing;
  py?: Spacing;
  testID?: string;
}

export const Screen = ({
  children,
  edges = [],
  bg = 'bg_base',
  px = 'zero',
  py = 'zero',
  testID = 'Screen',
}: ScreenProps) => {
  const wrapperStyles = useWrapperStyles();

  return (
    <Box py={py} px={px} testID={testID} style={styles.container(bg)}>
      <SafeView edges={edges} style={wrapperStyles.wrapper}>
        {children}
      </SafeView>
    </Box>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: (bg: ThemeColors) => ({
    backgroundColor: theme.colors[bg],
  }),
}));

const useWrapperStyles = makeAppStyles(() => ({
  wrapper: {
    flex: 1,
  },
}));

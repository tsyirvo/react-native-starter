import type { ReactNode } from 'react';
import type { Edge } from 'react-native-safe-area-context';

import { makeAppStyles, type Colors, type Spacing } from '$core/theme';

import { Box } from '../primitives';
import { SafeView } from '../safeView';

type ScreenProps = {
  edges?: Edge[];
  children: ReactNode;
  bg?: Colors;
  px?: Spacing;
  py?: Spacing;
  testID?: string;
};

export const Screen = ({
  children,
  edges = [],
  bg = 'bg',
  px = 'zero',
  py = 'zero',
  testID,
}: ScreenProps) => {
  const styles = useStyles();

  return (
    <Box bg={bg} flex={1} py={py} px={px} testID={testID}>
      <SafeView edges={edges} style={styles.wrapper}>
        {children}
      </SafeView>
    </Box>
  );
};

const useStyles = makeAppStyles(() => ({
  wrapper: {
    flex: 1,
  },
}));

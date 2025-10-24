import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { ThemeColors } from '$domain/newTheme/unistyles';

interface SeparatorProps {
  color?: ThemeColors;
  height?: number;
}

export const Separator = ({
  color = 'bg_muted',
  height = 1,
}: SeparatorProps) => {
  return <View style={styles.separator(color, height)} />;
};

const styles = StyleSheet.create((theme) => ({
  separator: (color: ThemeColors, height: number) => ({
    backgroundColor: theme.colors[color],
    height,
    width: '100%',
  }),
}));

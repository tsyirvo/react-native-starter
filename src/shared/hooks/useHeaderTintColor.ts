import { useUnistyles } from 'react-native-unistyles';

import { SUPPORTS_LIQUID_GLASS } from '$domain/constants';
import type { ThemeColors } from '$domain/theme';

const HEADER_TINT_COLOR_TOKEN: ThemeColors = 'core_primary';

export const useHeaderTintColor = () => {
  const { theme } = useUnistyles();

  if (SUPPORTS_LIQUID_GLASS) {
    return;
  }

  return theme.colors[HEADER_TINT_COLOR_TOKEN];
};

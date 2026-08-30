import type { NativeStackNavigationOptions } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

import { SUPPORTS_LIQUID_GLASS } from '$domain/constants';

export const useStackScreenOptions = (): NativeStackNavigationOptions => {
  const { theme } = useUnistyles();

  return {
    headerShown: true,
    headerTintColor: theme.colors.core_primary,
    ...(SUPPORTS_LIQUID_GLASS
      ? {}
      : { headerStyle: { backgroundColor: theme.colors.bg_base } }),
  };
};

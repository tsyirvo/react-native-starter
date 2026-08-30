import type { NativeStackNavigationOptions } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

import { SUPPORTS_LIQUID_GLASS } from '$domain/constants';
import { useHeaderTintColor } from '$shared/hooks';

export const useStackScreenOptions = (): NativeStackNavigationOptions => {
  const { theme } = useUnistyles();

  const headerTintColor = useHeaderTintColor();

  return {
    headerBackButtonDisplayMode: 'minimal',
    headerShown: true,
    ...(SUPPORTS_LIQUID_GLASS
      ? {}
      : {
          headerStyle: { backgroundColor: theme.colors.bg_base },
          headerTintColor,
        }),
  };
};

import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import type { ReactNode } from 'react';
import { useUnistyles } from 'react-native-unistyles';

interface NavigationThemeProviderProps {
  children: ReactNode;
}

export const NavigationThemeProvider = ({
  children,
}: NavigationThemeProviderProps) => {
  const { rt, theme } = useUnistyles();

  const baseTheme = rt.themeName === 'dark' ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,
    colors: {
      background: theme.colors.bg_base,
      border: theme.colors.border_default,
      card: theme.colors.bg_base,
      notification: theme.colors.negative,
      primary: theme.colors.core_primary,
      text: theme.colors.content_primary,
    },
  };

  return <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>;
};

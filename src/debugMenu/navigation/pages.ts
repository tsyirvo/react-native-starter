import { lazy } from 'react';

// Global
export const Menu = lazy(async () => import('../components/menu/Menu'));

// Theme
export const ThemeSandbox = lazy(
  async () => import('../components/theme/ThemeSandbox'),
);
export const Spaces = lazy(async () => import('../components/theme/Spaces'));
export const Colors = lazy(async () => import('../components/theme/Colors'));
export const FontSizes = lazy(
  async () => import('../components/theme/FontSizes'),
);
export const Radiuses = lazy(
  async () => import('../components/theme/Radiuses'),
);

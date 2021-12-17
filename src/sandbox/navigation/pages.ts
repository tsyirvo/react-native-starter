import { lazy } from 'react';

// Global
export const Menu = lazy(async () => import('../components/menu/Menu'));

/* ***** *****  Core  ***** ***** */

// Theme
export const ThemeSandbox = lazy(
  async () => import('../components/theme/Theme.sandbox'),
);
export const Spaces = lazy(
  async () => import('../components/theme/Spaces.sandbox'),
);
export const Colors = lazy(
  async () => import('../components/theme/Colors.sandbox'),
);
export const FontSizes = lazy(
  async () => import('../components/theme/FontSizes.sandbox'),
);
export const Radiuses = lazy(
  async () => import('../components/theme/Radiuses.sandbox'),
);

/* ***** *****  Components  ***** ***** */

// Primitives
export const PrimitivesSandbox = lazy(
  async () => import('../components/primitives/Primitives.sandbox'),
);
export const Box = lazy(
  async () => import('../components/primitives/Box.sandbox'),
);
export const Text = lazy(
  async () => import('../components/primitives/Text.sandbox'),
);
export const Button = lazy(
  async () => import('../components/primitives/Button.sandbox'),
);
export const Input = lazy(
  async () => import('../components/primitives/Input.sandbox'),
);

// Design System
export const DesignSystemSandbox = lazy(
  async () => import('../components/designSystem/DesignSystem.sandbox'),
);
export const FallbackLoader = lazy(
  async () => import('../components/designSystem/FallbackLoader.sandbox'),
);

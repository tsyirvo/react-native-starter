import { StackNavigationProp } from '@react-navigation/stack';

/* ***** *****  Stack router types  ***** ***** */

export type DebugStackParamList = {
  Menu: undefined;

  // Core
  Theme: undefined;
  Spaces: undefined;
  Colors: undefined;
  FontSizes: undefined;
  Radiuses: undefined;

  // Components
  Primitives: undefined;
  Box: undefined;
  Text: undefined;
  Button: undefined;
  Input: undefined;

  DesignSystem: undefined;
  FallbackLoader: undefined;
  // inject stack types before this
};

/* ***** *****  Pages navigation type  ***** ***** */

export type MenuScreenNavigationProp = StackNavigationProp<
  DebugStackParamList,
  'Menu'
>;
export type ThemeScreenNavigationProp = StackNavigationProp<
  DebugStackParamList,
  'Theme'
>;
export type PrimitivesScreenNavigationProp = StackNavigationProp<
  DebugStackParamList,
  'Primitives'
>;
export type DesignSystemScreenNavigationProp = StackNavigationProp<
  DebugStackParamList,
  'DesignSystem'
>;
// inject page types before this

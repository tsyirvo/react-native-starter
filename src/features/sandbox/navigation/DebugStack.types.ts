import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

export type MenuScreenNavigationProp = NativeStackNavigationProp<
  DebugStackParamList,
  'Menu'
>;
export type ThemeScreenNavigationProp = NativeStackNavigationProp<
  DebugStackParamList,
  'Theme'
>;
export type PrimitivesScreenNavigationProp = NativeStackNavigationProp<
  DebugStackParamList,
  'Primitives'
>;
export type DesignSystemScreenNavigationProp = NativeStackNavigationProp<
  DebugStackParamList,
  'DesignSystem'
>;
// inject page types before this

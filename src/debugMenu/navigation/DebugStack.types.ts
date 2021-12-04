import { StackNavigationProp } from '@react-navigation/stack';

/* ***** *****  Stack router types  ***** ***** */

export type DebugStackParamList = {
  Menu: undefined;
  Theme: undefined;
  Spaces: undefined;
  Colors: undefined;
  FontSizes: undefined;
  Radiuses: undefined;
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
// inject page types before this

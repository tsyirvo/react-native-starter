import { StackNavigationProp } from '@react-navigation/stack';

/* ***** *****  Stack router types  ***** ***** */

export type RootStackParamList = {
  Home: undefined;
  OtherPage: { someProps: string } | undefined;
  // inject stack types before this
};

/* ***** *****  Pages navigation type  ***** ***** */

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type OtherPageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OtherPage'
>;
// inject page types before this

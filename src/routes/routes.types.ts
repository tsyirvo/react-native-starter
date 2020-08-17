import { StackNavigationProp } from '@react-navigation/stack';

/* ***** *****  Stack router types  ***** ***** */

export type RootStackParamList = {
  Home: undefined;
  Details: { someProps: string } | undefined;
  About: undefined;
  // inject stack types before this
};

/* ***** *****  Pages navigation type  ***** ***** */

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;
// inject page types before this

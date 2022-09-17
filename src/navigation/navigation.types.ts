import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/* ***** *****  Stack router types  ***** ***** */

export type RootStackParamList = {
  Home: undefined;
  OtherPage: { someProps: string } | undefined;
  // inject stack types before this
};

/* ***** *****  Pages navigation type  ***** ***** */

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type OtherPageScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OtherPage'
>;
// inject page types before this

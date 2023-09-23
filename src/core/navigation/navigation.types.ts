import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/* ***** *****  Stack router types  ***** ***** */

export type RootStackParamList = {
  HomeScreen: undefined;
  OtherScreen: { someProps: string } | undefined;
  // inject stack types before this
};

/* ***** *****  Pages navigation type  ***** ***** */

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;
export type OtherScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OtherScreen'
>;
// inject page types before this

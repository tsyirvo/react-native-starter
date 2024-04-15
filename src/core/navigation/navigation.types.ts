import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/* ***** *****  Stack router types  ***** ***** */

export type RootStackParamList = {
  HomeScreen: undefined;
  OtherScreen: { someProps: string } | undefined;
  BlogPost: undefined;
  DummyForm: undefined;
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
export type BlogPostScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BlogPost'
>;
export type DummyFormScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DummyForm'
>;
// inject page types before this

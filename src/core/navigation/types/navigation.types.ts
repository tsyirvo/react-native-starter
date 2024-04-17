import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/* ***** *****  Stack router types  ***** ***** */

export type RootStackParamList = {
  HomeScreen: undefined;
  OtherScreen: { someProps: string } | undefined;
  BlogPostScreen: undefined;
  DummyFormScreen: undefined;
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
  'BlogPostScreen'
>;
export type DummyFormScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DummyFormScreen'
>;
// inject page types before this

import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Details: { someProps: string } | undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

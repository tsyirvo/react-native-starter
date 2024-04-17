import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

export const deepLinks = {
  prefixes: [prefix],
  config: {
    screens: {
      HomeScreen: 'home',
      OtherScreen: 'other-screen',
      BlogPostScreen: 'blog-post',
      DummyFormScreen: 'dummy-form',
    },
  },
};

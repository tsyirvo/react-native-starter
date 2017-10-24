import { StackNavigator as stack } from 'react-navigation';

import { Home, Posts } from './pages';

const navigationOptions = {
  headerMode: 'float',
  initialRouteName: 'Home',
};

const AppNavigator = stack(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
      },
    },
    Posts: {
      screen: Posts,
      navigationOptions: {
        title: 'Posts',
      },
    },
  },
  navigationOptions
);

export default AppNavigator;

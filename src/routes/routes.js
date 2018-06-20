import { createStackNavigator as stack } from 'react-navigation';

import {
  /* inject Hygen imports here */
  Home,
  Posts,
} from './pages';

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
    /* inject Hygen routes here */
  },
  navigationOptions
);

export default AppNavigator;

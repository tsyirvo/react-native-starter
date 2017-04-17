import { StackNavigator as stack } from 'react-navigation';

import {
  Home,
  Counter,
  Posts,
} from './pages';

const navigationOptions = {
  headerMode: 'float',
  initialRouteName: 'Home',
};

const AppNavigator = stack({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
  Counter: {
    screen: Counter,
    path: 'counter',
    navigationOptions: {
      title: 'Counter',
    },
  },
  Posts: {
    screen: Posts,
    path: 'posts/:id',
    navigationOptions: {
      title: 'Posts',
    },
  },
}, navigationOptions);

export default AppNavigator;

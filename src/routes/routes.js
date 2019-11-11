import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import * as Pages from './pages';

const AppNavigator = createStackNavigator(
  {
    Home: Pages.Home,
    Details: Pages.Details,
    Github: Pages.Github,
    // inject routes before this
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: true,
    },
  }
);

export default createAppContainer(AppNavigator);

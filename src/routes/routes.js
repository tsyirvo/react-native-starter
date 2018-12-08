import { createStackNavigator, createAppContainer } from 'react-navigation';

import * as Pages from './pages';

const AppNavigator = createStackNavigator(
  {
    Home: Pages.Home,
    Details: Pages.Details,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);

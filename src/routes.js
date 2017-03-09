import { StackNavigator as stack } from 'react-navigation';

import Home from './components/home/Home';
import About from './components/about/About';

const navigationOptions = {
  headerMode: 'none',
};

const AppNavigator = stack({
  Home: { screen: Home },
  About: { screen: About },
}, navigationOptions);

export default AppNavigator;

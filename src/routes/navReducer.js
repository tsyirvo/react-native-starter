import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import AppNavigator from './routes';

export const navReducer = createNavigationReducer(AppNavigator);

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const App = reduxifyNavigator(AppNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

export const AppWithNavigationState = connect(mapStateToProps)(App);

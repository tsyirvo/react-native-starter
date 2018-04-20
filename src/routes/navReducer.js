import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import AppNavigator from './routes';

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

export const addListener = createReduxBoundAddListener('root');

export default function navReducer(state, action) {
  const newState = AppNavigator.router.getStateForAction(action, state);

  return newState || state;
}

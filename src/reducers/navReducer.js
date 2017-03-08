import * as types from '../actions/actionTypes';
import AppNavigator from '../routes';

export default function navReducer(state, action) {
  const newState = AppNavigator.router.getStateForAction(action, state);

  if (action.type === types.PERSIST_REHYDRATE) {
    return {
      rehydrated: true,
    };
  }
  return newState || state;
}

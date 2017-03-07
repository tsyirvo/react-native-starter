import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist';
import { PERSIST_ENABLED, PERSIST_PURGE } from '../utils/persist';

import AppNavigator from '../routes';
import home from '../components/home/homeReducer';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);

  if (action.type === 'persist/REHYDRATE') {
    return {
      rehydrated: true,
    };
  }
  return newState || state;
};


const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    duration: true,
    timestamp: true,
  });

  middlewares.push(logger);
}

const enhancer = compose(
  PERSIST_ENABLED ? autoRehydrate() : f => f,
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line
    ? window.__REDUX_DEVTOOLS_EXTENSION__({}) // eslint-disable-line
    : f => f,
);

const appReducer = combineReducers({
  nav: navReducer,
  home,
});

const rootReducer = (state, action) => {
  let newState = state;

  if (action.type === 'CLEAR_APP') {
    newState = undefined;
  }

  return appReducer(newState, action);
};

export default function configureStore() {
  const store = createStore(
    rootReducer,
    undefined,
    enhancer,
  );

  if (PERSIST_ENABLED) {
    persistStore(store, {
      storage: AsyncStorage,
      debounce: 500,
    });
  }

  if (PERSIST_PURGE) {
    purgeStoredState({ storage: AsyncStorage });
  }

  return store;
}

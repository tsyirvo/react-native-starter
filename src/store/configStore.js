import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import reduxFreeze from 'redux-freeze';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist';

import indexReducer from './indexReducer';
import home from '../components/home/homeReducer';
import routes from '../navigation/routesReducer';

import { PERSIST_ENABLED, PERSIST_PURGE } from '../utils/persist';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    duration: true,
    timestamp: true
    // diff: true,
    // collapsed: (getState, action) => (
    //   action.type === 'ACTION_TO_HIDE'
    // )
  });

  middlewares.push(logger, reduxFreeze);
}

const enhancer = compose(
  PERSIST_ENABLED ? autoRehydrate() : (f) => { return f; },
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({}) :
  (f) => { return f; },
);

const appReducer = combineReducers({
  routes,
  home
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_APP') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default function configureStore() {
  const store = createStore(
    rootReducer,
    undefined,
    enhancer
  );

  if (PERSIST_ENABLED) {
    persistStore(store, {
      storage: AsyncStorage,
      debounce: 500
      // whitelist: []
    });
  }

  if (PERSIST_PURGE) {
    purgeStoredState({ storage: AsyncStorage });
  }

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = indexReducer.default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

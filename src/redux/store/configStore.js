import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist';
import { createEpicMiddleware } from 'redux-observable';

import Config from 'react-native-config';

import rootReducer from './indexReducers';
import rootEpic from './rootEpic'

// Env
const { PERSIST_ENABLED, PERSIST_PURGE, NODE_ENV } = Config;

// Common Middlewares
const epicMiddleware = createEpicMiddleware(rootEpic);
const middlewares = [epicMiddleware];

let enhancer = [];

if (NODE_ENV === 'development') {
  const logger = createLogger({
    duration: true,
    timestamp: true,
    collapsed: (getState, action) => {
      const types = ['persist/REHYDRATE'];

      return types.includes(action.type);
    },
  });

  middlewares.push(logger);

  enhancer = compose(
    PERSIST_ENABLED === 'true' ? autoRehydrate() : f => f,
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line
      ? window.__REDUX_DEVTOOLS_EXTENSION__({}) // eslint-disable-line
      : f => f,
  );
} else {
  enhancer = compose(autoRehydrate(), applyMiddleware(...middlewares));
}

export default function configureStore() {
  const store = createStore(rootReducer, undefined, enhancer);
  if (PERSIST_ENABLED === 'true') {
    persistStore(store, {
      storage: AsyncStorage,
      debounce: 500,
      blacklist: ['nav'],
    });
  }

  if (PERSIST_PURGE === 'true') {
    purgeStoredState({ storage: AsyncStorage });
  }

  return store;
}

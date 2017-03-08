import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist';

import { PERSIST_ENABLED, PERSIST_PURGE } from '../utils/persist';
import rootReducer from '../reducers/index';

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

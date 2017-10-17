import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './indexReducers';
import rootSaga from './rootSaga';

const PERSIST_ENABLED = false;
const PERSIST_PURGE = false;
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

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

  sagaMiddleware.run(rootSaga);

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

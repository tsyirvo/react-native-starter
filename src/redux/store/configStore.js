import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { createEpicMiddleware } from 'redux-observable';

import Config from 'react-native-config';

import rootReducer from './indexReducers';
import rootEpic from './rootEpic';

import { navMiddleware } from '../../routes/navReducer';

// Env
const { PERSIST_PURGE, NODE_ENV } = Config;

// Common Middlewares
const epicMiddleware = createEpicMiddleware(rootEpic);
const middlewares = [epicMiddleware, navMiddleware];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  throttle: 1000,
  blacklist: ['nav']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let enhancer = [];

if (NODE_ENV === 'development') {
  const logger = createLogger({
    duration: true,
    timestamp: true,
    collapsed: (getState, action) => {
      const types = ['persist/REHYDRATE'];

      return types.includes(action.type);
    }
  });

  middlewares.push(logger);

  enhancer = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line
      ? window.__REDUX_DEVTOOLS_EXTENSION__({}) // eslint-disable-line
      : f => f
  );
} else {
  enhancer = compose(applyMiddleware(...middlewares));
}

export default function configureStore() {
  const store = createStore(persistedReducer, undefined, enhancer);
  const persistor = persistStore(store);

  if (PERSIST_PURGE === 'true') {
    persistor.purge();
  }

  if (module.hot) {
    module.hot.accept(() => {
      // This fetch the new state of the above reducers.
      const nextRootReducer = rootReducer;
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }

  return { store, persistor };
}

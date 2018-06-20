import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import Router from 'routes/Router';
import configureStore from 'store/configStore';
import theme from 'styles/theme';

const { persistor, store } = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;

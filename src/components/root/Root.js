import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';

import Router from 'routes/Router';
import configureStore from 'store/configStore';
import theme from 'styles/appStyles';

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
};

export default Root;

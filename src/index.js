import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';

import Router from './routes/Router';
import configureStore from './store/configStore';
import theme from './styles/appStyles';

EStyleSheet.build(theme);

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default Root;

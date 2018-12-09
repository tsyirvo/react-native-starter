import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useScreens } from 'react-native-screens';

import AppContainer from 'routes/routes';

import theme from 'styles/theme';

useScreens();

const Root = () => (
  <ThemeProvider theme={theme}>
    <AppContainer />
  </ThemeProvider>
);

export default Root;

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { enableScreens } from 'react-native-screens';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import AppContainer from 'routes/routes';

import theme from 'styles/theme';

import { getRatio } from '@utils/dimensions';

enableScreens();
getRatio();

const API = '';
const GITHUB_TOKEN = '';

const client = new ApolloClient({
  uri: API,
  headers: { Authorization: `bearer ${GITHUB_TOKEN}` },
});

const Root = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  </ThemeProvider>
);

export default Root;

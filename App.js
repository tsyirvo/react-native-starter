import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useScreens } from 'react-native-screens';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Config from 'react-native-config';

import AppContainer from 'routes/routes';

import theme from 'styles/theme';

useScreens();

// GraphQL Client
const { API, GITHUB_TOKEN } = Config;

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

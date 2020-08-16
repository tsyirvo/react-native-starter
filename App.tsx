import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { enableScreens } from 'react-native-screens';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import AppContainer from 'routes/routes';

import theme from 'styles/theme';

import { getRatio } from '@utils/dimensions';

import Storybook from './storybook/Storybook';

enableScreens();
getRatio();

const API = '';
const GITHUB_TOKEN = '';

const client = new ApolloClient({
  uri: API,
  headers: { Authorization: `bearer ${GITHUB_TOKEN}` },
});

const Root = (): ReactElement => (
  <Storybook>
    <ThemeProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ApolloProvider client={client}>
          <AppContainer />
        </ApolloProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  </Storybook>
);

export default Root;

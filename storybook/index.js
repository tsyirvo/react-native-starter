/* eslint-disable */

import React, { Component } from 'react';
import { getStorybookUI, configure } from '@storybook/react-native';
import { ThemeProvider } from 'styled-components';

import { Flex } from '$components/shared/primitives';

import { loadStories } from './storyLoader';

import './rn-addons';
import theme from '../src/styles/theme';

// import all stories
configure(() => {
  loadStories();
}, module);

const StorybookUIRoot = getStorybookUI({ asyncStorage: null });

export class StorybookUIRootView extends Component {
  render() {
    return (
      <Flex>
        <ThemeProvider theme={theme}>
          <StorybookUIRoot />
        </ThemeProvider>
      </Flex>
    );
  }
}

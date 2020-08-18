/* eslint-disable */

import React, { Component } from 'react';
import { getStorybookUI, configure } from '@storybook/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import { Flex } from '@shared/primitives';

import './rn-addons';

// import all stories
configure(() => {
  require('../src/styles/__stories__/theme.story');
  require('./stories');
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

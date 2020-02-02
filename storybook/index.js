/* eslint-disable */

import React, { Component } from 'react';
import { View } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

// import './rn-addons';

// import all stories
configure(() => {
  require('./stories');
}, module);

const StorybookUIRoot = getStorybookUI({ asyncStorage: null });

const storybookStyles = { flex: 1, backgroundColor: 'white' };

export class StorybookUIRootView extends Component {
  render() {
    return (
      <View style={storybookStyles}>
        <ThemeProvider theme={theme}>
          <StorybookUIRoot />
        </ThemeProvider>
      </View>
    );
  }
}

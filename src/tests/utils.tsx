/* eslint-disable import/no-extraneous-dependencies */

import { render as rtlRender, RenderAPI } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '$styles/theme';
import { initI18n } from '$i18n/config';

initI18n();

const render = (page: ReactElement): RenderAPI => {
  const pageContainerComponent = (
    <ThemeProvider theme={theme}>{page}</ThemeProvider>
  );

  return rtlRender(pageContainerComponent);
};

export default render;

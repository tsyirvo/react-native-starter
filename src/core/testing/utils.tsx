/* eslint-disable import/no-extraneous-dependencies */

import { ThemeProvider } from '@shopify/restyle';
import type { RenderAPI } from '@testing-library/react-native';
import { cleanup, render as rtlRender } from '@testing-library/react-native';
import type { ReactElement } from 'react';

import { theme } from '$core/theme';

afterEach(cleanup);

export const customRender = (component: ReactElement): RenderAPI => {
  const wrapper = <ThemeProvider theme={theme}>{component}</ThemeProvider>;

  return rtlRender(wrapper);
};

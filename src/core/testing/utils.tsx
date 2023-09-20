/* eslint-disable import/no-extraneous-dependencies */

import { ThemeProvider } from '@shopify/restyle';
import {
  cleanup,
  render as rtlRender,
  RenderAPI,
} from '@testing-library/react-native';
import { ReactElement } from 'react';

import { theme } from '$core/theme';

afterEach(cleanup);

export const customRender = (component: ReactElement): RenderAPI => {
  const wrapper = <ThemeProvider theme={theme}>{component}</ThemeProvider>;

  return rtlRender(wrapper);
};

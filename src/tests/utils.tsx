/* eslint-disable import/no-extraneous-dependencies */

import { ThemeProvider } from '@shopify/restyle';
import {
  cleanup,
  render as rtlRender,
  RenderAPI,
} from '@testing-library/react-native';
import { ReactElement } from 'react';

import { theme } from '$styles/theme';

afterEach(cleanup);

const customRender = (component: ReactElement): RenderAPI => {
  const wrapper = <ThemeProvider theme={theme}>{component}</ThemeProvider>;

  return rtlRender(wrapper);
};

// re-export everything
export * from '@testing-library/react-native';
export { customRender as render };

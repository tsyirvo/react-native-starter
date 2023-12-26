/* eslint-disable import/no-extraneous-dependencies */

import { ThemeProvider } from '@shopify/restyle';
import type { RenderAPI } from '@testing-library/react-native';
import { cleanup, render as rtlRender } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from '$core/theme';

afterEach(cleanup);

export const customRender = (component: ReactElement): RenderAPI => {
  const wrapper = (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </SafeAreaProvider>
  );

  return rtlRender(wrapper);
};

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RenderAPI } from '@testing-library/react-native';
import { cleanup, render as rtlRender } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

afterEach(cleanup);

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
        staleTime: Infinity,
      },
    },
  });

export const customRender = (component: ReactElement): RenderAPI => {
  const wrapper = (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <QueryClientProvider client={createTestQueryClient()}>
        {component}
      </QueryClientProvider>
    </SafeAreaProvider>
  );

  return rtlRender(wrapper);
};

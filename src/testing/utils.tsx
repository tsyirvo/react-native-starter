import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RenderAPI } from '@testing-library/react-native';
import { cleanup, render as rtlRender } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

afterEach(cleanup);

interface WrapperProps {
  children: ReactNode;
}

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: Number.POSITIVE_INFINITY,
        retry: false,
        staleTime: Number.POSITIVE_INFINITY,
      },
    },
  });

export const customRender = (component: ReactElement): RenderAPI => {
  const queryClient = createTestQueryClient();
  const Wrapper = ({ children }: WrapperProps) => (
    <SafeAreaProvider
      initialMetrics={{
        frame: { height: 0, width: 0, x: 0, y: 0 },
        insets: { bottom: 0, left: 0, right: 0, top: 0 },
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SafeAreaProvider>
  );

  return rtlRender(component, { wrapper: Wrapper });
};

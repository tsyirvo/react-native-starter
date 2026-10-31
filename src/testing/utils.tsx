import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RenderResult } from '@testing-library/react-native';
import { render as rtlRender } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

// Each render mounts a new wrapper, so every test gets a fresh QueryClient
// that is kept across rerenders.
const Wrapper = ({ children }: WrapperProps) => {
  const [queryClient] = useState(createTestQueryClient);

  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { height: 0, width: 0, x: 0, y: 0 },
        insets: { bottom: 0, left: 0, right: 0, top: 0 },
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SafeAreaProvider>
  );
};

export const customRender = (component: ReactElement): Promise<RenderResult> =>
  rtlRender(component, { wrapper: Wrapper });

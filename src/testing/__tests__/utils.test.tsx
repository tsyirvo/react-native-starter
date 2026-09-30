import { useQueryClient } from '@tanstack/react-query';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { render, screen } from '$testing';

interface QueryProbeProps {
  cacheValue?: string;
}

const QueryProbe = ({ cacheValue }: QueryProbeProps) => {
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();

  if (cacheValue) {
    queryClient.setQueryData(['render-helper'], cacheValue);
  }

  return (
    <Text>{`${queryClient.getQueryData(['render-helper']) ?? 'empty'}:${insets.top}`}</Text>
  );
};

describe('customRender', () => {
  it('preserves providers and the query cache across rerenders', () => {
    const { rerender } = render(<QueryProbe cacheValue="cached" />);

    expect(screen.getByText('cached:0')).toBeOnTheScreen();
    rerender(<QueryProbe />);
    expect(screen.getByText('cached:0')).toBeOnTheScreen();
  });

  it('isolates the query cache between render calls', () => {
    const { unmount } = render(<QueryProbe cacheValue="cached" />);
    unmount();

    render(<QueryProbe />);

    expect(screen.getByText('empty:0')).toBeOnTheScreen();
  });
});

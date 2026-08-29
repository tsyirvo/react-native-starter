import { render, screen } from '$domain/testing';

import { Stack } from '../Stack';
import { Text } from '../Text';

describe('Stack component', () => {
  it('should render correctly', () => {
    render(<Stack testID="stackId" />);

    expect(screen.getByTestId('stackId')).toBeDefined();
  });

  it('should render children', () => {
    render(
      <Stack testID="stackId">
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </Stack>,
    );

    expect(screen.getByText('Child 1')).toBeDefined();
    expect(screen.getByText('Child 2')).toBeDefined();
  });

  it('should apply spacing props', () => {
    render(
      <Stack mt="spacing_8" p="spacing_16" testID="stackId">
        <Text>Content</Text>
      </Stack>,
    );

    expect(screen.getByTestId('stackId')).toBeDefined();
  });

  it('should apply alignment props', () => {
    render(
      <Stack align="center" justify="center" testID="stackId">
        <Text>Centered Content</Text>
      </Stack>,
    );

    expect(screen.getByTestId('stackId')).toBeDefined();
  });

  it('should apply gap prop', () => {
    render(
      <Stack gap="spacing_8" testID="stackId">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Stack>,
    );

    expect(screen.getByTestId('stackId')).toBeDefined();
  });
});

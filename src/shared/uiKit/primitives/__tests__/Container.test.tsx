import { render, screen } from '$domain/testing';

import { Box } from '../Box';
import { Text } from '../Text';

describe('Container component', () => {
  it('should render correctly', () => {
    render(<Box testID="containerId" />);

    expect(screen.getByTestId('containerId')).toBeDefined();
  });

  it('should render children', () => {
    render(
      <Box testID="containerId">
        <Text>Child Content</Text>
      </Box>,
    );

    expect(screen.getByText('Child Content')).toBeDefined();
  });

  it('should apply spacing props', () => {
    render(
      <Box testID="containerId" p="spacing_24" mb="spacing_16">
        <Text>Content</Text>
      </Box>,
    );

    expect(screen.getByTestId('containerId')).toBeDefined();
  });

  it('should apply alignment props', () => {
    render(
      <Box testID="containerId" align="center" justify="flex-end">
        <Text>Aligned Content</Text>
      </Box>,
    );

    expect(screen.getByTestId('containerId')).toBeDefined();
  });

  it('should apply flex direction and wrap props', () => {
    render(
      <Box testID="containerId" direction="row" wrap="wrap">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Box>,
    );

    expect(screen.getByTestId('containerId')).toBeDefined();
  });

  it('should apply custom flex value', () => {
    render(
      <Box testID="containerId" flex={2}>
        <Text>Content</Text>
      </Box>,
    );

    expect(screen.getByTestId('containerId')).toBeDefined();
  });

  it('should apply gap prop', () => {
    render(
      <Box testID="containerId" gap="spacing_12">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Box>,
    );

    expect(screen.getByTestId('containerId')).toBeDefined();
  });
});

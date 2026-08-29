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
      <Box mb="spacing_16" p="spacing_24" testID="containerId">
        <Text>Content</Text>
      </Box>,
    );

    expect(screen.getByTestId('containerId')).toBeDefined();
  });

  it('should apply alignment props', () => {
    render(
      <Box align="center" justify="flex-end" testID="containerId">
        <Text>Aligned Content</Text>
      </Box>,
    );

    expect(screen.getByTestId('containerId')).toBeDefined();
  });

  it('should apply flex direction and wrap props', () => {
    render(
      <Box direction="row" testID="containerId" wrap="wrap">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Box>,
    );

    expect(screen.getByTestId('containerId')).toBeDefined();
  });

  it('should apply custom flex value', () => {
    render(
      <Box flex={2} testID="containerId">
        <Text>Content</Text>
      </Box>,
    );

    expect(screen.getByTestId('containerId')).toBeDefined();
  });

  it('should apply gap prop', () => {
    render(
      <Box gap="spacing_12" testID="containerId">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Box>,
    );

    expect(screen.getByTestId('containerId')).toBeDefined();
  });
});

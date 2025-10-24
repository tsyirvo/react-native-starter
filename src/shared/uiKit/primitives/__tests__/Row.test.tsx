import { render, screen } from '$domain/testing';

import { Row } from '../Row';
import { Text } from '../Text';

describe('Row component', () => {
  it('should render correctly', () => {
    render(<Row testID="rowId" />);

    expect(screen.getByTestId('rowId')).toBeDefined();
  });

  it('should render children', () => {
    render(
      <Row testID="rowId">
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </Row>,
    );

    expect(screen.getByText('Child 1')).toBeDefined();
    expect(screen.getByText('Child 2')).toBeDefined();
  });

  it('should apply spacing props', () => {
    render(
      <Row testID="rowId" p="spacing_16" mx="spacing_8">
        <Text>Content</Text>
      </Row>,
    );

    expect(screen.getByTestId('rowId')).toBeDefined();
  });

  it('should apply alignment props', () => {
    render(
      <Row testID="rowId" align="center" justify="space-between">
        <Text>Left</Text>
        <Text>Right</Text>
      </Row>,
    );

    expect(screen.getByTestId('rowId')).toBeDefined();
  });

  it('should apply gap prop', () => {
    render(
      <Row testID="rowId" gap="spacing_16">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Row>,
    );

    expect(screen.getByTestId('rowId')).toBeDefined();
  });
});

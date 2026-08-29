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
      <Row mx="spacing_8" p="spacing_16" testID="rowId">
        <Text>Content</Text>
      </Row>,
    );

    expect(screen.getByTestId('rowId')).toBeDefined();
  });

  it('should apply alignment props', () => {
    render(
      <Row align="center" justify="space-between" testID="rowId">
        <Text>Left</Text>
        <Text>Right</Text>
      </Row>,
    );

    expect(screen.getByTestId('rowId')).toBeDefined();
  });

  it('should apply gap prop', () => {
    render(
      <Row gap="spacing_16" testID="rowId">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Row>,
    );

    expect(screen.getByTestId('rowId')).toBeDefined();
  });
});

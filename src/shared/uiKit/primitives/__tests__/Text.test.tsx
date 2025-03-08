import { render, screen } from '$core/testing';

import { Text } from '../Text';

describe('Text component', () => {
  const dummyText = 'Hello world';

  it('Should render correctly', () => {
    // Given
    render(<Text>{dummyText}</Text>);

    // Then
    expect(screen.getByText(dummyText)).toBeDefined();
  });
});

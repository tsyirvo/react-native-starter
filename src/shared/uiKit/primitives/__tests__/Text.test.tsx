import { render } from '$core/testing';

import { Text } from '../Text';

describe('Text component', () => {
  const dummyText = 'Hello world';

  it('Should render correctly', () => {
    // Given
    const { getByText } = render(<Text>{dummyText}</Text>);

    // Then
    expect(getByText(dummyText)).toBeDefined();
  });
});

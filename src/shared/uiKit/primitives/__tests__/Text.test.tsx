import { render, screen } from '$testing';

import { Text } from '../Text';

describe('Text component', () => {
  const dummyText = 'Hello world';

  it('Should render correctly', () => {
    render(<Text>{dummyText}</Text>);

    expect(screen.getByText(dummyText)).toBeDefined();
  });
});

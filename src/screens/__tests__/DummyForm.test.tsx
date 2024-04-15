import { render } from '$core/testing';

import { DummyForm } from '../DummyForm';

describe('DummyForm screen', () => {
  it('should render correctly', () => {
    // Given
    const { getByText } = render(<DummyForm />);

    // Then
    expect(getByText('DummyForm screen')).toBeDefined();
  });
});

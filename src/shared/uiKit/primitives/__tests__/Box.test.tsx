import { render } from '$core/testing';

import { Box } from '../Box';

describe('Box component', () => {
  it('should render correctly', () => {
    // Given
    const { getByTestId } = render(<Box testID="boxID" />);

    // Then
    expect(getByTestId('boxID')).toBeDefined();
  });
});

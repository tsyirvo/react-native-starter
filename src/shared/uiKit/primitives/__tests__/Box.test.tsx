import { render, screen } from '$core/testing';

import { Box } from '../Box';

describe('Box component', () => {
  it('should render correctly', () => {
    // Given
    render(<Box testID="box-id" />);

    // Then
    expect(screen.getByTestId('box-id')).toBeDefined();
  });
});

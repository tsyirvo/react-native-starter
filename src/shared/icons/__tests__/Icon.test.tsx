import { render, screen } from '$testing';

import { Icon } from '../Icon';

describe('Icon', () => {
  it('should hide decorative icons from accessibility', () => {
    render(<Icon name="home" size={24} />);

    expect(screen.queryByTestId('Icon')).toBeNull();
    expect(
      screen.getByTestId('Icon', { includeHiddenElements: true }),
    ).toBeDefined();
  });

  it('should expose labelled icons as images', () => {
    render(<Icon accessibilityLabel="Home" name="home" size={24} />);

    expect(screen.getByRole('image', { name: 'Home' })).toBeDefined();
  });
});

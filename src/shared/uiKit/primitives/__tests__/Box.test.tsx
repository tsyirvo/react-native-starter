import { render, screen } from '$domain/testing';

import { Box } from '../Box';

describe('Box component', () => {
  it('should render correctly', () => {
    render(<Box testID="boxId" />);

    expect(screen.getByTestId('boxId')).toBeDefined();
  });
});

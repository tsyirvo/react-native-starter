import { render } from '$core/testing';

import { BlogPost } from '../BlogPost';

describe('BlogPost screen', () => {
  it('should render correctly', () => {
    // Given
    const { getByText } = render(<BlogPost />);

    // Then
    expect(getByText('BlogPost screen')).toBeDefined();
  });
});

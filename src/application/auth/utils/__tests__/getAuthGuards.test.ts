import { getAuthGuards } from '../getAuthGuards';

describe('getAuthGuards', () => {
  it('shows login, not protected tabs, before demo sign-in', () => {
    expect(getAuthGuards(null)).toEqual({
      isAnonymous: true,
      isAuthenticated: false,
    });
  });

  it('shows protected tabs, not login, for the demo user', () => {
    expect(getAuthGuards({ email: 'demo@example.com', id: '1' })).toEqual({
      isAnonymous: false,
      isAuthenticated: true,
    });
  });
});

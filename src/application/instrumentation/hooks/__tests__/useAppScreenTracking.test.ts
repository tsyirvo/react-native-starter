import { usePathname } from 'expo-router';

import { Analytics } from '$infra/analytics';
import { renderHook } from '$testing';

import { useAppScreenTracking } from '../useAppScreenTracking';

jest.mock('expo-router', () => ({ usePathname: jest.fn() }));
jest.mock('$infra/analytics', () => ({
  Analytics: { trackEvent: jest.fn() },
}));

describe('useAppScreenTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('tracks the root path as the home screen', () => {
    jest.mocked(usePathname).mockReturnValue('/');

    renderHook(useAppScreenTracking);

    expect(Analytics.trackEvent).toHaveBeenCalledWith('home-screen-viewed');
  });

  it('derives a kebab-case event from nested paths and tracks each navigation', () => {
    jest.mocked(usePathname).mockReturnValue('/features/storeRating');
    const { rerender } = renderHook(useAppScreenTracking);

    jest.mocked(usePathname).mockReturnValue('/Profile');
    rerender({});

    expect(Analytics.trackEvent).toHaveBeenNthCalledWith(
      1,
      'features>store-rating-screen-viewed',
    );
    expect(Analytics.trackEvent).toHaveBeenNthCalledWith(
      2,
      'profile-screen-viewed',
    );
  });
});

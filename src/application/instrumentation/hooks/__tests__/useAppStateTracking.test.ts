import { Analytics } from '$infra/analytics';
import { useAppState } from '$shared/hooks';
import { renderHook } from '$testing';

import { useAppStateTracking } from '../useAppStateTracking';

jest.mock('$infra/analytics', () => ({
  Analytics: { trackEvent: jest.fn() },
}));
jest.mock('$shared/hooks', () => ({ useAppState: jest.fn() }));

const getAppStateHandlers = () => {
  const handlers = jest.mocked(useAppState).mock.calls[0]?.[0];

  if (!handlers) {
    throw new Error('useAppState was not called');
  }

  return handlers;
};

describe('useAppStateTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('tracks the app coming to the foreground', () => {
    renderHook(useAppStateTracking);

    getAppStateHandlers().onComingToForeground();

    expect(Analytics.trackEvent).toHaveBeenCalledWith('app-put-in-foreground');
  });

  it('tracks the app going to the background', () => {
    renderHook(useAppStateTracking);

    getAppStateHandlers().onGoingToBackground();

    expect(Analytics.trackEvent).toHaveBeenCalledWith('app-put-in-background');
  });
});

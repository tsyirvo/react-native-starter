import { Logger } from '$infra/logger';
import { setIsBootstrappingApplication } from '$infra/store';
import { renderHook } from '$testing';

import { useGetSessionState } from '../useGetSessionState';
import { useGetUserSession } from '../useGetUserSession';

jest.mock('../useGetUserSession', () => ({ useGetUserSession: jest.fn() }));
jest.mock('$infra/store', () => ({
  setIsBootstrappingApplication: jest.fn(),
}));

const sessionResult = (overrides: {
  isFetched?: boolean;
  isError?: boolean;
  failureCount?: number;
  error?: Error | null;
}) =>
  ({
    error: null,
    failureCount: 0,
    isError: false,
    isFetched: false,
    ...overrides,
  }) as ReturnType<typeof useGetUserSession>;

describe('useGetSessionState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('leaves bootstrap pending while the session query has not fetched', async () => {
    jest.mocked(useGetUserSession).mockReturnValue(sessionResult({}));

    await renderHook(useGetSessionState);

    expect(setIsBootstrappingApplication).not.toHaveBeenCalled();
  });

  it('releases bootstrap on fetched completion without restoring login', async () => {
    jest
      .mocked(useGetUserSession)
      .mockReturnValue(sessionResult({ isFetched: true }));

    const { rerender } = await renderHook(useGetSessionState);
    await rerender({});

    expect(setIsBootstrappingApplication).toHaveBeenCalledTimes(1);
    expect(setIsBootstrappingApplication).toHaveBeenCalledWith(false);
  });

  it('logs a settled failure and releases bootstrap without restoring a session', async () => {
    const error = new Error('session unavailable');
    jest.mocked(useGetUserSession).mockReturnValue(
      sessionResult({
        error,
        failureCount: 1,
        isError: true,
        isFetched: true,
      }),
    );

    await renderHook(useGetSessionState);

    expect(Logger.dev).toHaveBeenCalledWith(
      'Failed to fetch session on app bootstrap. Continuing without a session.',
      { error, failureCount: 1, isError: true, isFetched: true },
    );
    expect(setIsBootstrappingApplication).toHaveBeenCalledWith(false);
  });
});

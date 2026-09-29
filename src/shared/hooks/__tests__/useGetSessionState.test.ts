import { useGetUserSession } from '$application/auth';
import { renderHook } from '$domain/testing';
import { Logger } from '$infra/logger';
import { useAppStore } from '$infra/store';

import { useGetSessionState } from '../useGetSessionState';

jest.mock('$application/auth', () => ({ useGetUserSession: jest.fn() }));
jest.mock('$infra/logger', () => ({ Logger: { dev: jest.fn() } }));
jest.mock('$infra/store', () => ({ useAppStore: jest.fn() }));

const setIsBootstrappingApplication = jest.fn();
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
    jest.mocked(useAppStore).mockReturnValue(setIsBootstrappingApplication);
  });

  it('leaves bootstrap pending while the session query has not fetched', () => {
    jest.mocked(useGetUserSession).mockReturnValue(sessionResult({}));

    renderHook(useGetSessionState);

    expect(setIsBootstrappingApplication).not.toHaveBeenCalled();
  });

  it('releases bootstrap on fetched completion without restoring login', () => {
    jest
      .mocked(useGetUserSession)
      .mockReturnValue(sessionResult({ isFetched: true }));

    const { rerender } = renderHook(useGetSessionState);
    rerender({});

    expect(setIsBootstrappingApplication).toHaveBeenCalledTimes(1);
    expect(setIsBootstrappingApplication).toHaveBeenCalledWith(false);
  });

  it('logs the first error and does not claim a restored session', () => {
    const error = new Error('session unavailable');
    jest.mocked(useGetUserSession).mockReturnValue(
      sessionResult({
        error,
        failureCount: 1,
        isError: true,
        isFetched: true,
      }),
    );

    renderHook(useGetSessionState);

    expect(Logger.dev).toHaveBeenCalledWith(
      'Failed to fetch session on app bootstrap. Retrying...',
      { error, failureCount: 1, isError: true, isFetched: true },
    );
    expect(setIsBootstrappingApplication).not.toHaveBeenCalled();
  });
});

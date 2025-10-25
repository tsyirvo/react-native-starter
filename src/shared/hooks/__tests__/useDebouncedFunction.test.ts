import { renderHook } from '$domain/testing';

import { useDebouncedFunction } from '../useDebouncedFunction';

describe('useDebouncedFunction', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('should return a stable debounced function', () => {
    const callback = jest.fn();
    const { result, rerender } = renderHook(() =>
      useDebouncedFunction(callback, 500, {}),
    );

    const firstResult = result.current;

    rerender({});

    expect(result.current).toBe(firstResult);
  });

  it('should call the latest version of the callback', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { result, rerender } = renderHook(
      (props: { cb: () => void }) => useDebouncedFunction(props.cb, 100),
      { initialProps: { cb: callback1 } },
    );

    result.current();

    jest.advanceTimersByTime(100);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    rerender({ cb: callback2 });

    result.current();

    jest.advanceTimersByTime(100);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should debounce function calls', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedFunction(callback, 500, { leading: false, trailing: true }),
    );

    result.current();
    result.current();
    result.current();

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments correctly', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncedFunction(callback, 100));

    result.current('arg1', 'arg2', 123);

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 123);
  });

  it('should support leading edge option', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedFunction(callback, 500, { leading: true, trailing: false }),
    );

    result.current();
    result.current();
    result.current();

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

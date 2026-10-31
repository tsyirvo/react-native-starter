import { act, renderHook } from '$testing';

import { usePress } from '../usePress';

describe('usePress', () => {
  it('forwards arguments, blocks calls while pending and accepts calls after resolution', async () => {
    const pending = Promise.withResolvers<void>();
    const onPress = jest.fn((_value: string) => pending.promise);
    const { result } = await renderHook(() => usePress({ onPress }));
    let submission: Promise<unknown> | undefined;

    await act(() => {
      submission = result.current[0]?.('first');
    });
    expect(result.current[1]).toBe(true);
    await act(async () => {
      await result.current[0]?.('duplicate');
    });
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith('first');

    await act(async () => {
      pending.resolve();
      await submission;
    });
    expect(result.current[1]).toBe(false);

    await act(async () => {
      await result.current[0]?.('next');
    });
    expect(onPress).toHaveBeenLastCalledWith('next');
    expect(onPress).toHaveBeenCalledTimes(2);
  });

  it('propagates rejection and releases the pending state for a subsequent call', async () => {
    const pending = Promise.withResolvers<void>();
    const error = new Error('submission failed');
    const onPress = jest.fn(() => pending.promise);
    const { result } = await renderHook(() => usePress({ onPress }));
    let submission: Promise<unknown> | undefined;

    await act(() => {
      submission = result.current[0]?.(undefined);
    });
    const rejection = expect(submission).rejects.toBe(error);
    await act(async () => {
      pending.reject(error);
      await rejection;
    });
    expect(result.current[1]).toBe(false);

    onPress.mockResolvedValueOnce(undefined);
    await act(async () => {
      await result.current[0]?.(undefined);
    });
    expect(onPress).toHaveBeenCalledTimes(2);
    expect(result.current[1]).toBe(false);
  });

  it('ignores calls when disabled', async () => {
    const onPress = jest.fn();
    const { result } = await renderHook(() =>
      usePress({ isDisabled: true, onPress }),
    );

    await result.current[0]?.(undefined);

    expect(onPress).not.toHaveBeenCalled();
  });
});

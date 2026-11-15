import { AccessibilityInfo } from 'react-native';

import { act, renderHook } from '$testing';

import { useIsReduceMotionEnabled } from '../useIsReduceMotionEnabled';
import { useIsScreenReaderEnabled } from '../useIsScreenReaderEnabled';

const addEventListener = jest.mocked(AccessibilityInfo.addEventListener);

const emit = (
  eventName: 'reduceMotionChanged' | 'screenReaderChanged',
  isEnabled: boolean,
) =>
  act(() => {
    for (const [name, listener] of addEventListener.mock.calls) {
      if (name === eventName) {
        listener(isEnabled);
      }
    }
  });

describe('useIsScreenReaderEnabled', () => {
  beforeEach(() => addEventListener.mockClear());

  it('reads the current setting, then follows its changes', async () => {
    jest
      .mocked(AccessibilityInfo.isScreenReaderEnabled)
      .mockResolvedValueOnce(true);

    const { result } = await renderHook(() => useIsScreenReaderEnabled());

    expect(result.current).toBe(true);

    await emit('screenReaderChanged', false);

    expect(result.current).toBe(false);
  });
});

describe('useIsReduceMotionEnabled', () => {
  beforeEach(() => addEventListener.mockClear());

  it('reads the current setting when it changed after launch', async () => {
    jest
      .mocked(AccessibilityInfo.isReduceMotionEnabled)
      .mockResolvedValueOnce(true);

    const { result } = await renderHook(() => useIsReduceMotionEnabled());

    expect(result.current).toBe(true);
  });

  it('keeps a change that arrives before the current setting', async () => {
    let resolveQuery: (isEnabled: boolean) => void = () => undefined;
    jest.mocked(AccessibilityInfo.isReduceMotionEnabled).mockReturnValueOnce(
      new Promise((resolve) => {
        resolveQuery = resolve;
      }),
    );

    const { result } = await renderHook(() => useIsReduceMotionEnabled());

    await emit('reduceMotionChanged', true);
    await act(async () => resolveQuery(false));

    expect(result.current).toBe(true);
  });

  it('follows the setting when it changes while the app runs', async () => {
    const { result } = await renderHook(() => useIsReduceMotionEnabled());

    expect(result.current).toBe(false);

    await emit('reduceMotionChanged', true);

    expect(result.current).toBe(true);
  });
});

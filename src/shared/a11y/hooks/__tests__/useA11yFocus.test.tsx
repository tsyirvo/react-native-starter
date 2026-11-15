import type { ComponentRef } from 'react';
import { AccessibilityInfo, View } from 'react-native';

import { act, render } from '$testing';

import { useA11yFocus } from '../useA11yFocus';

const mockPlatform = { isAndroid: false };

jest.mock('$infra/config', () => ({
  get IS_ANDROID() {
    return mockPlatform.isAndroid;
  },
}));

const FOCUS_DELAY_MS = 50;

type ViewInstance = ComponentRef<typeof View>;

let focusTarget: () => void = () => undefined;
let targetInstance: () => ViewInstance | null = () => null;

const FocusTarget = () => {
  const { focus, ref } = useA11yFocus<ViewInstance>();

  focusTarget = focus;
  targetInstance = () => ref.current;

  return <View accessible ref={ref} />;
};

describe('useA11yFocus', () => {
  const sendEventSpy = jest
    .spyOn(AccessibilityInfo, 'sendAccessibilityEvent')
    .mockImplementation(() => undefined);

  beforeEach(() => {
    jest.useFakeTimers();
    sendEventSpy.mockClear();
  });

  afterEach(() => jest.useRealTimers());

  it.each([
    [false, 'focus'],
    [true, 'viewHoverEnter'],
  ])(
    'moves the screen reader to the view after a delay (Android: %s)',
    async (isAndroid, eventType) => {
      mockPlatform.isAndroid = isAndroid;
      await render(<FocusTarget />);

      focusTarget();
      expect(sendEventSpy).not.toHaveBeenCalled();

      await act(() => jest.advanceTimersByTime(FOCUS_DELAY_MS));

      expect(sendEventSpy).toHaveBeenCalledTimes(1);
      expect(targetInstance()).not.toBeNull();
      expect(sendEventSpy).toHaveBeenCalledWith(targetInstance(), eventType);
    },
  );

  it('does not focus a view that unmounts during the delay', async () => {
    const { unmount } = await render(<FocusTarget />);

    focusTarget();
    await unmount();
    await act(() => jest.advanceTimersByTime(FOCUS_DELAY_MS));

    expect(sendEventSpy).not.toHaveBeenCalled();
  });
});

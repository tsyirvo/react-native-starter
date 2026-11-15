import { useRef } from 'react';
import { AccessibilityInfo, type HostInstance } from 'react-native';

import { IS_ANDROID } from '$infra/config';

// The view must mount natively before the screen reader can focus it.
const FOCUS_DELAY_MS = 50;

export const useA11yFocus = <Instance extends HostInstance>() => {
  const ref = useRef<Instance | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const focus = () => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      if (!ref.current) {
        return;
      }

      // TalkBack follows a focus event only in the active window.
      // A hover event moves TalkBack to the view in all windows.
      AccessibilityInfo.sendAccessibilityEvent(
        ref.current,
        IS_ANDROID ? 'viewHoverEnter' : 'focus',
      );
    }, FOCUS_DELAY_MS);
  };

  return { focus, ref };
};

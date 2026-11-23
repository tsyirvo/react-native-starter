import type { AccessibilityRole, AccessibilityState } from 'react-native';

import { IS_IOS } from '$infra/config';

// VoiceOver announces neither the progressbar role nor the busy state.
// On iOS, these functions remove them and put the busy state in the label.

export const busyRole = (isBusy: boolean, role: AccessibilityRole) => {
  if (!isBusy) {
    return role;
  }

  return IS_IOS ? undefined : 'progressbar';
};

export const busyLabel = (label: string, isBusy: boolean, busyText: string) =>
  IS_IOS && isBusy ? `${label}, ${busyText}` : label;

export const busyState = (isBusy: boolean, state: AccessibilityState = {}): AccessibilityState =>
  IS_IOS ? state : { ...state, busy: isBusy };

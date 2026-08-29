import * as Haptics from 'expo-haptics';

import { IS_ANDROID } from '$domain/constants';

export type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'selection';
export type HapticNotificationType = 'success' | 'warning' | 'error';

const mapHapticFeedbackTypeToHapticsType: Record<
  HapticFeedbackType,
  Haptics.ImpactFeedbackStyle
> = {
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  selection: Haptics.ImpactFeedbackStyle.Light,
};

const mapHapticNotificationTypeToAndroidType: Record<
  HapticNotificationType,
  Haptics.AndroidHaptics
> = {
  error: Haptics.AndroidHaptics.Reject,
  success: Haptics.AndroidHaptics.Confirm,
  warning: Haptics.AndroidHaptics.Reject,
};
const mapHapticNotificationTypeToHapticsType: Record<
  HapticNotificationType,
  Haptics.NotificationFeedbackType
> = {
  error: Haptics.NotificationFeedbackType.Error,
  success: Haptics.NotificationFeedbackType.Success,
  warning: Haptics.NotificationFeedbackType.Warning,
};

export const triggerHapticFeedback = (type: HapticFeedbackType = 'medium') => {
  if (IS_ANDROID) {
    void Haptics.performAndroidHapticsAsync(
      Haptics.AndroidHaptics.Context_Click,
    );

    return;
  }

  if (type === 'selection') {
    void Haptics.selectionAsync();
  }

  void Haptics.impactAsync(mapHapticFeedbackTypeToHapticsType[type]);
};

export const triggerHapticNotification = (
  type: HapticNotificationType = 'success',
) => {
  if (IS_ANDROID) {
    void Haptics.performAndroidHapticsAsync(
      mapHapticNotificationTypeToAndroidType[type],
    );

    return;
  }

  void Haptics.notificationAsync(mapHapticNotificationTypeToHapticsType[type]);
};

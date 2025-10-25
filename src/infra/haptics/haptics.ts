import * as Haptics from 'expo-haptics';

import { IS_ANDROID } from '$domain/constants';

export type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'selection';
export type HapticNotificationType = 'success' | 'warning' | 'error';

const mapHapticFeedbackTypeToHapticsType: Record<
  HapticFeedbackType,
  Haptics.ImpactFeedbackStyle
> = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
  selection: Haptics.ImpactFeedbackStyle.Light,
};

const mapHapticNotificationTypeToAndroidType: Record<
  HapticNotificationType,
  Haptics.AndroidHaptics
> = {
  success: Haptics.AndroidHaptics.Confirm,
  warning: Haptics.AndroidHaptics.Reject,
  error: Haptics.AndroidHaptics.Reject,
};
const mapHapticNotificationTypeToHapticsType: Record<
  HapticNotificationType,
  Haptics.NotificationFeedbackType
> = {
  success: Haptics.NotificationFeedbackType.Success,
  warning: Haptics.NotificationFeedbackType.Warning,
  error: Haptics.NotificationFeedbackType.Error,
};

export const triggerHapticFeedback = (type: HapticFeedbackType = 'medium') => {
  if (IS_ANDROID) {
    void Haptics.performAndroidHapticsAsync(
      Haptics.AndroidHaptics.Context_Click,
    );

    return;
  }

  if (type === 'selection') void Haptics.selectionAsync();

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

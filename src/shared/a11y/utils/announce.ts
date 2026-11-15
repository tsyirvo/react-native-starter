import { AccessibilityInfo } from 'react-native';

export const announce = (message: string) => {
  AccessibilityInfo.announceForAccessibility(message);
};

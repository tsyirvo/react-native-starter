import type { AccessibilityProps } from 'react-native';

type A11yBaseKey = 'accessible' | 'accessibilityLabel' | 'accessibilityLanguage';

/**
 * The accessibility props that a hook sets. Each listed key is present, but
 * its value can be undefined on a platform that must not receive it.
 */
export type A11yProps<Key extends keyof AccessibilityProps = never> = Required<
  Pick<AccessibilityProps, A11yBaseKey>
> & {
  [K in Key]-?: AccessibilityProps[K];
};

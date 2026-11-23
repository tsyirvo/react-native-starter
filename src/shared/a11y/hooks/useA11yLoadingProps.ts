import { useTranslation } from 'react-i18next';

import type { A11yProps } from '../types';
import { busyRole, busyState } from '../utils';

export const useA11yLoadingProps = (): A11yProps<'accessibilityRole' | 'accessibilityState'> => {
  const { t, i18n } = useTranslation();

  return {
    accessibilityLabel: t('a11y.loading'),
    accessibilityLanguage: i18n.language,
    accessibilityRole: busyRole(true, 'progressbar'),
    accessibilityState: busyState(true),
    accessible: true,
  };
};

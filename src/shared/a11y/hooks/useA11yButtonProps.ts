import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { A11yProps } from '../types';
import { announce, busyLabel, busyRole, busyState } from '../utils';

interface A11yButtonParams {
  hint?: string;
  isDisabled: boolean;
  isLoading: boolean;
  label: string;
}

export const useA11yButtonProps = ({
  hint,
  isDisabled,
  isLoading,
  label,
}: A11yButtonParams): A11yProps<
  'accessibilityHint' | 'accessibilityRole' | 'accessibilityState'
> => {
  const { t, i18n } = useTranslation();

  const wasLoading = useRef(isLoading);

  useEffect(() => {
    if (wasLoading.current && !isLoading) {
      announce(t('a11y.loadingComplete'));
    }

    wasLoading.current = isLoading;
  }, [isLoading, t]);

  return {
    accessibilityHint: hint,
    accessibilityLabel: busyLabel(label, isLoading, t('a11y.busy')),
    accessibilityLanguage: i18n.language,
    accessibilityRole: busyRole(isLoading, 'button'),
    accessibilityState: busyState(isLoading, {
      disabled: isDisabled || isLoading,
    }),
    accessible: true,
  };
};

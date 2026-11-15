import { useTranslation } from 'react-i18next';

import type { A11yProps } from '../types';

interface A11yTextInputParams {
  error?: string;
  hint?: string;
  isOptional: boolean;
  label: string;
}

export const useA11yTextInputProps = ({
  error,
  hint,
  isOptional,
  label,
}: A11yTextInputParams): A11yProps<'accessibilityHint'> => {
  const { t, i18n } = useTranslation();

  const labelParts = [label, isOptional && t('forms.optional'), error];

  return {
    accessibilityHint: hint,
    accessibilityLabel: labelParts.filter(Boolean).join(', '),
    accessibilityLanguage: i18n.language,
    accessible: true,
  };
};

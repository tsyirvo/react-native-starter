// We force the dependency to i18n to be sure that all the dates are updated when the language is changed

import type dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatDate, formatDateRelative } from '../date';
import type { DateFormat } from '../date.types';

export const useFormatDate = ({
  date,
  format,
}: {
  date: dayjs.ConfigType;
  format: DateFormat;
}): string => {
  const { i18n } = useTranslation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Dep is forced so dates are re-rendered when the language changes
  return useMemo<string>(
    () => formatDate({ date, format }),
    [date, format, i18n.language],
  );
};

export const useFormatDateRelative = ({
  date,
  withoutSuffix,
}: {
  date: dayjs.ConfigType;
  withoutSuffix?: boolean;
}): string => {
  const { i18n } = useTranslation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Dep is forced so dates are re-rendered when the language changes
  return useMemo<string>(
    () => formatDateRelative({ date, withoutSuffix }),
    [date, withoutSuffix, i18n.language],
  );
};

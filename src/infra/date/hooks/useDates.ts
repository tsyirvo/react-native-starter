// We force the dependency to i18n to be sure that all the dates are updated when the language is changed
// eslint-disable-next-line react-compiler/react-compiler
/* eslint-disable react-hooks/exhaustive-deps */

import type dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatDate, formatDateRelative } from '../date';
import { DateFormats } from '../date.types';

export const useFormatDate = ({
  date,
  format,
}: {
  date: dayjs.ConfigType;
  format: DateFormats;
}): string => {
  const { i18n } = useTranslation();

  return useMemo<string>(() => {
    return formatDate({ date, format });
  }, [date, format, i18n.language]);
};

export const useFormatDateRelative = ({
  date,
  withoutSuffix,
}: {
  date: dayjs.ConfigType;
  withoutSuffix?: boolean;
}): string => {
  const { i18n } = useTranslation();

  return useMemo<string>(() => {
    return formatDateRelative({ date, withoutSuffix });
  }, [date, withoutSuffix, i18n.language]);
};

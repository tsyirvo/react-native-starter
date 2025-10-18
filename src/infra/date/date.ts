import dayjs from 'dayjs';
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjsUtc from 'dayjs/plugin/utc';

import type { DateFormats } from './date.types';

import 'dayjs/locale/fr';
import 'dayjs/locale/en';

/* ***** *****  Pluging config  ***** ***** */

dayjs.extend(dayjsLocalizedFormat);
dayjs.extend(dayjsUtc);
dayjs.extend(relativeTime);

/* ***** *****  Initialization  ***** ***** */

export const initDateLocale = (locale: string) => dayjs.locale(locale);

/* ***** *****  Formatting  ***** ***** */

export const formatDate = ({
  date,
  format,
}: {
  date: dayjs.ConfigType;
  format: DateFormats;
}) => dayjs.utc(date).format(format);

export const formatDateRelative = ({
  date,
  withoutSuffix,
}: {
  date: dayjs.ConfigType;
  withoutSuffix?: boolean;
}) => dayjs.utc(date).fromNow(withoutSuffix);

/* ***** *****  Getters  ***** ***** */

export const getDateInfo = ({
  date,
  informationToGet,
}: {
  date: dayjs.ConfigType;
  informationToGet: dayjs.UnitType;
}) => dayjs.utc(date).get(informationToGet);

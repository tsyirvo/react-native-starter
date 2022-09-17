import dayjs from 'dayjs';
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjsUtc from 'dayjs/plugin/utc';

import 'dayjs/locale/fr';
import { DateFormats } from './date.types';

/* ***** *****  Pluging config  ***** ***** */

dayjs.extend(dayjsLocalizedFormat);
dayjs.extend(dayjsUtc);

/* ***** *****  Initialization  ***** ***** */

export const initDateLocale = (locale: string) => dayjs.locale(locale);

export const getDateLocale = () => dayjs.locale();

/* ***** *****  Formatting  ***** ***** */

export const formatDate = ({
  date,
  format,
}: {
  date: dayjs.ConfigType;
  format: DateFormats;
}) => dayjs(date).format(format);

export const formatDateUTC = ({
  date,
  format,
}: {
  date: dayjs.ConfigType;
  format: DateFormats;
}) => dayjs(date).utc().format(format);

/* ***** *****  Getters  ***** ***** */

export const getDateInfo = ({
  date,
  informationToGet,
}: {
  date: dayjs.ConfigType;
  informationToGet: dayjs.UnitType;
}) => dayjs(date).get(informationToGet);

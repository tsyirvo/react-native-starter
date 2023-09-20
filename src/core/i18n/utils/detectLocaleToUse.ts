import * as Localization from 'expo-localization';

import { config } from '$core/constants';

const SELECTED_LOCALIZATION = 0;
const NOT_FOUND_INDEX = -1;

const getDeviceRegion = () => {
  const locales = Localization.getLocales();
  const calendar = Localization.getCalendars();

  const primaryLocale = locales[SELECTED_LOCALIZATION];
  const primaryCalendar = calendar[SELECTED_LOCALIZATION];

  const region = primaryLocale?.regionCode;
  const languageTag = primaryLocale?.languageTag;
  const timezone = primaryCalendar?.timeZone;

  return {
    region,
    languageTag: languageTag ?? config.defaultLocale,
    timezone: timezone ?? 'Africa/Abidjan', // Default timezone being GMT +0
  };
};

export const getSupportedDateLocale = () => {
  const { languageTag } = getDeviceRegion();

  const isSupportedLocale = config.supportedLocales.findIndex(
    (supportedLanguage) => {
      if (languageTag.includes(supportedLanguage)) {
        return true;
      }

      return false;
    },
  );
  const dateLocaleToSet =
    isSupportedLocale !== NOT_FOUND_INDEX ? languageTag : null;

  return dateLocaleToSet ?? config.defaultLocale;
};

import * as Localization from 'expo-localization';

import { config } from '$domain/constants';

const PRIMARY_LOCALIZATION = 0;
const NOT_FOUND = -1;

const SLICE_START = 0;
const SLICE_END = 2;

const getDeviceRegion = () => {
  const locales = Localization.getLocales();
  const calendar = Localization.getCalendars();

  const primaryLocale = locales[PRIMARY_LOCALIZATION];
  const primaryCalendar = calendar[PRIMARY_LOCALIZATION];

  const { regionCode: region, languageTag } = primaryLocale;
  const { timeZone: timezone } = primaryCalendar;

  return {
    languageTag,
    region,
    timezone: timezone ?? 'Africa/Abidjan', // Default timezone being GMT +0
  };
};

export const getSupportedLocale = () => {
  const { languageTag } = getDeviceRegion();

  const supportedLocaleIndex = config.supportedLocales.findIndex(
    (supportedLanguage) => {
      if (languageTag.includes(supportedLanguage)) {
        return true;
      }

      return false;
    },
  );
  const localeToSet = supportedLocaleIndex === NOT_FOUND ? null : languageTag;

  if (localeToSet) {
    return localeToSet.slice(SLICE_START, SLICE_END);
  }

  return config.defaultLocale;
};

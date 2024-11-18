import type { LanguageDetectorModule } from 'i18next';

import { Analytics } from '$core/analytics';
import { storageKeys } from '$core/constants';
import { AppStorage } from '$core/storage';

import { getSupportedLocale } from './detectLocaleToUse';

export const getSavedAppLocale = () =>
  AppStorage.getString(storageKeys.appStorage.locale);

export const setSavedAppLocale = (locale: string) => {
  AppStorage.set(storageKeys.appStorage.locale, locale);
};

const detectLanguageToUse = () => {
  const currentlySelectedLocale = getSavedAppLocale();

  if (currentlySelectedLocale) {
    Analytics.setUserProperty('language', currentlySelectedLocale);

    return currentlySelectedLocale;
  }

  const localeToUse = getSupportedLocale();

  Analytics.setUserProperty('language', localeToUse);
  setSavedAppLocale(localeToUse);

  return localeToUse;
};

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: detectLanguageToUse,
};

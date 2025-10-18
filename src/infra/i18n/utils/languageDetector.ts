import type { LanguageDetectorModule } from 'i18next';

import { storageKeys } from '$domain/constants';
import { initDateLocale } from '$infra/date';
import { AppStorage } from '$infra/storage';

import { getSupportedLocale } from './detectLocaleToUse';

export const getSavedAppLocale = () =>
  AppStorage.getString(storageKeys.appStorage.locale);

export const setSavedAppLocale = (locale: string) => {
  AppStorage.set(storageKeys.appStorage.locale, locale);
};

export const detectLanguageToUse = () => {
  const currentlySelectedLocale = getSavedAppLocale();

  if (currentlySelectedLocale) return currentlySelectedLocale;

  const localeToUse = getSupportedLocale();

  setSavedAppLocale(localeToUse);

  return localeToUse;
};

const detectAndConfigureLocaleToUse = () => {
  const localeToUse = detectLanguageToUse();

  initDateLocale(localeToUse);
  setSavedAppLocale(localeToUse);

  return localeToUse;
};

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: detectAndConfigureLocaleToUse,
};

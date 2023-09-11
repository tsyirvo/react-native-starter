import * as Localization from 'expo-localization';
import { LanguageDetectorModule } from 'i18next';

import { storageKeys } from '$core/constants';
import AppStorage from '$core/storage';

export const fallbackLanguage = 'en';

const getSelectedLocale = () =>
  AppStorage.getString(storageKeys.appStorage.locale);

const setPhonePrimaryLocale = (locale: string) =>
  AppStorage.set(storageKeys.appStorage.locale, locale);

const detectPhonePrimaryLocale = () => {
  const locales = Localization.getLocales();

  const primaryLocaleIndex = 0;
  const primaryLocale = locales[primaryLocaleIndex];

  return primaryLocale?.languageTag;
};

const detectLanguageToUse = () => {
  const currentlySelectedLocale = getSelectedLocale();

  if (currentlySelectedLocale) {
    return currentlySelectedLocale;
  }

  const phonePrimaryLocale = detectPhonePrimaryLocale();

  setPhonePrimaryLocale(phonePrimaryLocale ?? fallbackLanguage);

  return phonePrimaryLocale;
};

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: detectLanguageToUse,
};

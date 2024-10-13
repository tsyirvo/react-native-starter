import * as Localization from 'expo-localization';
import type { LanguageDetectorModule } from 'i18next';

import { Analytics } from '$core/analytics';
import { config, storageKeys } from '$core/constants';
import { AppStorage } from '$core/storage';

export const getSavedAppLocale = () =>
  AppStorage.getString(storageKeys.appStorage.locale);

export const setSavedAppLocale = (locale: string) => {
  AppStorage.set(storageKeys.appStorage.locale, locale);
};

const detectPhonePrimaryLocale = () => {
  const locales = Localization.getLocales();

  const primaryLocaleIndex = 0;
  const primaryLocale = locales[primaryLocaleIndex];

  return primaryLocale?.languageTag;
};

const detectLanguageToUse = () => {
  const currentlySelectedLocale = getSavedAppLocale();

  if (currentlySelectedLocale) {
    Analytics.setUserProperty('language', currentlySelectedLocale);

    return currentlySelectedLocale;
  }

  const phonePrimaryLocale = detectPhonePrimaryLocale();

  const selectedLanguage = phonePrimaryLocale ?? config.defaultLocale;

  Analytics.setUserProperty('language', selectedLanguage);
  setSavedAppLocale(selectedLanguage);

  return selectedLanguage;
};

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: detectLanguageToUse,
};

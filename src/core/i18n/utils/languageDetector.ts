import * as Localization from 'expo-localization';
import type { LanguageDetectorModule } from 'i18next';

import { Analytics } from '$core/analytics';
import { config, storageKeys } from '$core/constants';
import { Notifications } from '$core/notifications';
import { AppStorage } from '$core/storage';

const getSelectedLocale = () =>
  AppStorage.getString(storageKeys.appStorage.locale);

const setPhonePrimaryLocale = (locale: string) => {
  AppStorage.set(storageKeys.appStorage.locale, locale);
};

const detectPhonePrimaryLocale = () => {
  const locales = Localization.getLocales();

  const primaryLocaleIndex = 0;
  const primaryLocale = locales[primaryLocaleIndex];

  return primaryLocale?.languageTag;
};

const detectLanguageToUse = () => {
  const currentlySelectedLocale = getSelectedLocale();

  if (currentlySelectedLocale) {
    Notifications.setUserLanguage(currentlySelectedLocale);
    Analytics.setUserProperty('language', currentlySelectedLocale);

    return currentlySelectedLocale;
  }

  const phonePrimaryLocale = detectPhonePrimaryLocale();

  const selectedLanguage = phonePrimaryLocale ?? config.defaultLocale;

  Notifications.setUserLanguage(selectedLanguage);
  Analytics.setUserProperty('language', selectedLanguage);
  setPhonePrimaryLocale(selectedLanguage);

  return selectedLanguage;
};

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: detectLanguageToUse,
};

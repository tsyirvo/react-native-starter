import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import { config, storageKeys } from '$core/constants';
import AppStorage from '$core/storage';

type SupportedLocales = 'en' | 'fr';
type TranslationGetters = Record<SupportedLocales, () => object>;

const translationGetters: TranslationGetters = {
  en: () => require('$i18n/locales/en.json'),
  fr: () => require('$i18n/locales/fr.json'),
};

/* ***** *****  Utils  ***** ***** */

const getPhoneLocale = () => {
  const localeFallback = { languageTag: config.defaultLocale };
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(config.supportedLocales) ??
    localeFallback;

  return languageTag;
};

const storeLocaleInStorage = (locale: string) => {
  try {
    AppStorage.set(storageKeys.appStorage.locale, locale);
  } catch (err) {
    // TODO(error): Send to error monitoring
  }
};

const setAppLocale = (locale: string, saveToStorage?: boolean) => {
  let translations = translationGetters[locale as SupportedLocales];

  if (!config.supportedLocales.includes(locale)) {
    translations = translationGetters.en;
  }

  i18n.translations = { [locale]: translations() };
  i18n.locale = locale;

  if (saveToStorage) {
    storeLocaleInStorage(locale);
  }
};

/* ***** *****  I18n  ***** ***** */

i18n.fallbacks = true;
i18n.translations = { en: translationGetters.en() };

export function initI18n() {
  let locale;

  try {
    locale = AppStorage.getString(storageKeys.appStorage.locale);
  } catch (err) {
    // TODO(error): Send to error monitoring
  }

  if (locale == null) {
    locale = getPhoneLocale();
  }

  setAppLocale(locale, true);
  RNLocalize.addEventListener('change', () => {
    setAppLocale(getPhoneLocale(), true);
  });
}

export default i18n;

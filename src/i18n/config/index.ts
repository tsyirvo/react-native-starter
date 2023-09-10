import { I18n } from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import { config, storageKeys } from '$core/constants';
import { initDateLocale } from '$core/date';
import Logger from '$core/logger';
import AppStorage from '$core/storage';

type SupportedLocales = 'en' | 'fr';
type TranslationGetters = Record<SupportedLocales, () => object>;

const translationGetters: TranslationGetters = {
  en: () => require('$i18n/locales/en.json'),
  fr: () => require('$i18n/locales/fr.json'),
};

const i18n = new I18n();

/* ***** *****  Utils  ***** ***** */

const getPhoneLocale = () => {
  const localeFallback = { languageTag: config.defaultLocale };
  const { languageTag } =
    RNLocalize.findBestLanguageTag(config.supportedLocales) ?? localeFallback;

  return languageTag;
};

const storeLocaleInStorage = (locale: string) => {
  try {
    AppStorage.set(storageKeys.appStorage.locale, locale);
  } catch (error) {
    Logger.error({
      type: 'I18n',
      message: 'Failed to set the locale in the Storage',
      error,
    });
  }
};

const setAppLocale = (locale: string, saveToStorage?: boolean) => {
  let translations = translationGetters[locale as SupportedLocales];

  if (!config.supportedLocales.includes(locale)) {
    translations = translationGetters.en;
  }

  i18n.translations = { [locale]: translations() };
  i18n.locale = locale;

  initDateLocale(locale);

  if (saveToStorage) {
    storeLocaleInStorage(locale);
  }
};

/* ***** *****  I18n  ***** ***** */

i18n.enableFallback = true;
i18n.translations = { en: translationGetters.en() };

export const initI18n = () => {
  let locale;

  try {
    locale = AppStorage.getString(storageKeys.appStorage.locale);
  } catch (error) {
    Logger.error({
      type: 'I18n',
      message: 'Failed to get the locale from the Storage',
      error,
    });
  }

  if (locale == null) {
    locale = getPhoneLocale();
  }

  setAppLocale(locale, true);
};

export default i18n;

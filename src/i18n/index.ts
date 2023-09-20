import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import Toaster from '$core/toaster';

import { fallbackLanguage, languageDetector } from './languageDetector';
import { resources } from './resources';

type SupportedLanguages = 'en' | 'fr';

const SUPPORTED_LANGUAGES = ['en', 'fr'];

export const i18n = i18next.use(initReactI18next).use(languageDetector).init({
  fallbackLng: fallbackLanguage,
  supportedLngs: SUPPORTED_LANGUAGES,
  nonExplicitSupportedLngs: true,
  defaultNS: 'common',
  resources,
  load: 'languageOnly',
  compatibilityJSON: 'v3',
});

export const changeLanguage = async (language: SupportedLanguages) => {
  await i18next.changeLanguage(language, (error, t) => {
    if (error) {
      return Toaster.show({
        text1: t('changeLocale.failure', { ns: 'settings' }),
      });
    }

    Toaster.show({
      text1: t('changeLocale.success', { ns: 'settings' }),
    });
  });
};

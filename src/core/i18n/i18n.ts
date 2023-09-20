import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { config } from '$core/constants';

import { resources } from './resources';
import { languageDetector } from './utils/languageDetector';

export const i18n = i18next.use(initReactI18next).use(languageDetector).init({
  fallbackLng: config.defaultLocale,
  supportedLngs: config.supportedLocales,
  nonExplicitSupportedLngs: true,
  defaultNS: 'common',
  resources,
  load: 'languageOnly',
  compatibilityJSON: 'v3',
});

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { config } from '$domain/constants';

import { resources } from './resources';
import { languageDetector } from './utils/languageDetector';

export const i18n = i18next.use(initReactI18next).use(languageDetector).init({
  defaultNS: 'messages',
  fallbackLng: config.defaultLocale,
  load: 'languageOnly',
  nonExplicitSupportedLngs: true,
  resources,
  supportedLngs: config.supportedLocales,
});

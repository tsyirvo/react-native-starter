import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import getDeviceLanguage from '@utils/getDeviceLanguage';

import fr from './locales/fr.json';
import en from './locales/en.json';

const DEFAULT_LANGUAGE = 'en';

i18n.use(initReactI18next).init({
  lng: getDeviceLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: ['en', 'fr', 'dev'],
  load: 'languageOnly',
  cleanCode: true,
  debug: process.env.NODE_ENV === 'development',
  resources: {
    fr,
    en,
  },
});

export default i18n;

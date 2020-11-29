import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import getDeviceLanguage from '$utils/getDeviceLanguage';
import config from '$utils/config';

import fr from './locales/fr.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  lng: getDeviceLanguage(),
  fallbackLng: config.defaultLocale,
  supportedLngs: config.locales,
  load: 'languageOnly',
  cleanCode: true,
  debug: false,
  resources: {
    fr,
    en,
  },
});

export default i18n;

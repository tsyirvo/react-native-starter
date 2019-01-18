import { Platform, NativeModules } from 'react-native';

import translations from '../../data/i18n.json';

const getDeviceLanguage = () => {
  if (
    Platform.OS === 'ios' &&
    NativeModules.SettingsManager &&
    NativeModules.SettingsManager.settings.AppleLocale.substr(0, 2) === 'fr'
  ) {
    return 'fr';
  }

  if (
    Platform.OS === 'android' &&
    NativeModules.I18nManager &&
    NativeModules.I18nManager.localeIdentifier.substr(0, 2) === 'fr'
  ) {
    return 'fr';
  }

  return 'en';
};

const getString = (target, key, defaultKey) => target[key] || defaultKey;

const doesStartsWithVowel = param => {
  const letter = param[0];

  if (
    letter === 'a' ||
    letter === 'e' ||
    letter === 'i' ||
    letter === 'o' ||
    letter === 'u' ||
    letter === 'y'
  ) {
    return true;
  }

  return false;
};

const getTranslations = (category, key, params, elisionParam = null) => {
  const lang = getDeviceLanguage();
  let newKey = key;

  // Handle elision of the translation depending on a param
  if (elisionParam && params[elisionParam]) {
    newKey = doesStartsWithVowel(params[elisionParam])
      ? `${key}.vowel`
      : `${key}.consonant`;
  }

  const res = getString(translations[lang][category], newKey, key);

  if (!res) return res;

  return res.replace(/\/%(.*?)%\//g, (matching, param) => params[param]);
};

export default getTranslations;

/* eslint-disable @typescript-eslint/no-explicit-any */

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

const getString = (
  target: { [key: string]: any },
  key: string,
  defaultKey: string
) => (target && target[key]) || defaultKey;

const doesStartsWithVowel = (param: string) => {
  const letter = param[0].toLowerCase();

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

const getTranslations = (
  category: string,
  key: string,
  params?: { [key: string]: any },
  elisionParam?: string
) => {
  const lang = getDeviceLanguage();
  let newKey = key;

  // Handle elision of the translation depending on a param
  if (!!elisionParam && params && params[elisionParam]) {
    newKey = doesStartsWithVowel(params[elisionParam])
      ? `${key}_vowel`
      : `${key}_consonant`;
  }

  const res = getString((translations[lang] as any)[category], newKey, key);

  if (!res) return res;

  return res.replace(
    /\/%(.*?)%\//g,
    (_: string, param: string) => params && params[param]
  );
};

export default getTranslations;

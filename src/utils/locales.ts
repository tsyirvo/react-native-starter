/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-destructuring */

import { Platform, NativeModules } from 'react-native';

import translations from '../../data/i18n.json';

type supportedLanguages = 'en' | 'fr';

const getDeviceLanguage = (): supportedLanguages => {
  const { SettingsManager, I18nManager } = NativeModules;
  let deviceLocale;

  switch (Platform.OS) {
    case 'ios':
      deviceLocale = SettingsManager?.settings?.AppleLocale?.substr(0, 2);
      if (!deviceLocale)
        deviceLocale = SettingsManager?.settings?.AppleLanguages[0];
      break;
    case 'android':
    default:
      deviceLocale = I18nManager?.localeIdentifier?.substr(0, 2);
      break;
  }

  if (deviceLocale === 'fr') return deviceLocale;

  return 'en';
};

const getString = (
  target: { [key: string]: any },
  key: string,
  defaultKey: string
) => (target && target[key]) || defaultKey;

const doesStartsWithVowel = (param: string) => {
  const letter = param[0].toLowerCase();

  switch (letter) {
    case 'a':
    case 'e':
    case 'i':
    case 'o':
    case 'u':
    case 'y':
      return true;
    default:
      return false;
  }
};

const getTranslations = (
  category: string,
  key: string,
  params?: { [key: string]: any },
  elisionParam?: string
): string => {
  const lang = getDeviceLanguage();
  let newKey = key;

  // Handle elision of the translation depending on a param (mainly for french locales)
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

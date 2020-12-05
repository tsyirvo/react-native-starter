import { Platform, NativeModules } from 'react-native';

import config from '$utils/config';

const getDeviceLanguage = () => {
  /* eslint-disable-next-line */
  const { SettingsManager, I18nManager } = NativeModules;

  let deviceLocale: string | undefined;

  switch (Platform.OS) {
    case 'ios':
      deviceLocale = SettingsManager?.settings?.AppleLanguages[0];
      if (!deviceLocale) deviceLocale = SettingsManager?.settings?.AppleLocale;
      break;
    case 'android':
    default:
      deviceLocale = I18nManager?.localeIdentifier;
      break;
  }

  return deviceLocale;
};

export const findSupportedLocale = (locale: string) =>
  config.locales.find((supportedLocale) => supportedLocale === locale);

export const getAppLanguageFromDevice = () => {
  const deviceLanguage = getDeviceLanguage();

  if (!deviceLanguage) return config.defaultLocale;

  const foundLocale =
    findSupportedLocale(deviceLanguage) ||
    findSupportedLocale(deviceLanguage.substr(0, 2));

  if (!foundLocale) {
    console.error(
      `Unsupported device language ${deviceLanguage}, using default ${config.defaultLocale}`,
    );

    return config.defaultLocale;
  }

  return foundLocale;
};

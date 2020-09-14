import { Platform, NativeModules } from 'react-native';

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

export default getDeviceLanguage;

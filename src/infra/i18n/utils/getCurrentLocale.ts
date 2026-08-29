import type { i18n as I18n } from 'i18next';

import { config } from '$domain/constants';

export const getCurrentLocale = (i18n: I18n) => {
  const languageCode = i18n.language;
  const [primaryCode] = languageCode.split('-');

  if (i18n.hasResourceBundle(languageCode, 'common')) {
    return languageCode;
  }
  if (primaryCode && i18n.hasResourceBundle(primaryCode, 'common')) {
    return primaryCode;
  }

  return config.defaultLocale;
};

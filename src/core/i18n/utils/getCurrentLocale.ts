import type { i18n } from 'i18next';

import { config } from '$core/constants';

export const getCurrentLocale = (i18n: i18n) => {
  const languageCode = i18n.language;
  const [primaryCode] = languageCode.split('-');

  if (i18n.hasResourceBundle(languageCode, 'common')) {
    return languageCode;
  } else if (primaryCode && i18n.hasResourceBundle(primaryCode, 'common')) {
    return primaryCode;
  }

  return config.defaultLocale;
};

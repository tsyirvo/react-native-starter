import i18next from 'i18next';

import { Toaster } from '$core/toaster';

import { setSavedAppLocale } from './languageDetector';

type SupportedLanguages = 'en' | 'fr';

export const changeLanguage = async (language: SupportedLanguages) => {
  await i18next.changeLanguage(language, (error, t) => {
    if (error) {
      Toaster.show({
        text1: t('changeLocale.failure', { ns: 'settings' }),
      });

      return;
    }

    setSavedAppLocale(language);

    Toaster.show({
      text1: t('changeLocale.success', { ns: 'settings' }),
    });
  });
};

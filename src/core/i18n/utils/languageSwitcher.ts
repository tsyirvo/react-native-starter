import i18next from 'i18next';

import { Analytics } from '$core/analytics';
import type { config } from '$core/constants';
import { initDateLocale } from '$core/date';
import { Notifications } from '$core/notifications';
import { Toaster } from '$core/toaster';

import { setSavedAppLocale } from './languageDetector';

import type { UnionFromArray } from '$types';

type SupportedLanguages = UnionFromArray<typeof config.supportedLocales>;

export const changeLanguage = async (language: SupportedLanguages) => {
  await i18next.changeLanguage(language, (error, t) => {
    if (error) {
      Toaster.show({
        text1: t('settings.changeLocale.failure'),
      });

      return;
    }

    setSavedAppLocale(language);
    Notifications.setUserLanguage(language);
    Analytics.setUserProperty('language', language);
    initDateLocale(language);

    Toaster.show({
      text1: t('settings.changeLocale.success'),
    });
  });
};

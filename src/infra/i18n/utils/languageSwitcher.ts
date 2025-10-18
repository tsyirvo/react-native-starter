import i18next from 'i18next';

import type { config } from '$domain/constants';
import { Analytics } from '$infra/analytics';
import { initDateLocale } from '$infra/date';
import { Notifications } from '$infra/notifications';
import { Toaster } from '$infra/toaster';

import { setSavedAppLocale } from './languageDetector';

import type { UnionFromArray } from '$types';

type SupportedLanguages = UnionFromArray<typeof config.supportedLocales>;

export const changeLanguage = async (language: SupportedLanguages) => {
  await i18next.changeLanguage(language, (error, t) => {
    if (error) {
      Toaster.show({
        text1: t('appConfig.changeLocale.failure'),
      });

      return;
    }

    setSavedAppLocale(language);

    initDateLocale(language);

    Notifications.setUserLanguage(language);
    Analytics.setUserProperty('language', language);

    Toaster.show({
      text1: t('appConfig.changeLocale.success'),
    });
  });
};

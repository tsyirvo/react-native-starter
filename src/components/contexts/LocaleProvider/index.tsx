import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
  ReactElement,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import config, { SupportedLocales } from '$utils/config';
import i18n from '$i18n/index';

import {
  getAppLanguageFromDevice,
  findSupportedLocale,
} from './utils/localesUtils';

type Props = {
  children: ReactElement;
};

export type LocaleContextValue = {
  locale: SupportedLocales;
  setLocale: (locale: string) => void;
};

export const LocaleContext = createContext<LocaleContextValue>({
  locale: config.defaultLocale,
  setLocale: () => {},
});

const LOCALE_STORE_KEY = 'locale';

const LocaleProvider = ({ children }: Props) => {
  const defaultLocale = useRef(getAppLanguageFromDevice());
  const [locale, setLocale] = useState(defaultLocale.current);
  const [isLoading, setIsLoading] = useState(true);

  const handleSetLocale = useCallback(async (nextLocale: string) => {
    const foundLocale = findSupportedLocale(nextLocale);

    if (!foundLocale) {
      console.error(
        `Unable to set locale to ${nextLocale}. Supported locales are ${config.locales.join(
          ', ',
        )}`,
      );
    } else {
      setLocale(foundLocale);
      i18n.changeLanguage(foundLocale);
      await AsyncStorage.setItem(LOCALE_STORE_KEY, foundLocale);
    }
  }, []);

  useEffect(() => {
    const getStoredLocale = async () => {
      try {
        const storedLocale = await AsyncStorage.getItem(LOCALE_STORE_KEY);

        if (storedLocale) {
          const foundLocale = findSupportedLocale(storedLocale);

          if (foundLocale) {
            setLocale(foundLocale);
            i18n.changeLanguage(foundLocale);
          } else {
            console.error(
              `Language stored in device '${storedLocale}' is not supported. Supported locales are ${config.locales.join(
                ', ',
              )}`,
            );
          }
        }
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    getStoredLocale();
  }, [handleSetLocale]);

  const contextValues = useMemo(
    () => ({ locale, setLocale: handleSetLocale }),
    [locale, handleSetLocale],
  );

  if (isLoading) return null;

  return (
    <LocaleContext.Provider value={contextValues}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;

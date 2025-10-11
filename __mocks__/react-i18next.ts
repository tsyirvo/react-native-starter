export const withTranslation = () => (Component: any) => {
  Component.defaultProps = { ...Component.defaultProps, t: () => '' };
  return Component;
};

export const useTranslation = () => {
  return {
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  };
};

export const initReactI18next = {
  type: '3rdParty',
  init: () => {},
};

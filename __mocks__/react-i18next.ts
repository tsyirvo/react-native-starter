module.exports = {
  withTranslation: () => (Component) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };
    return Component;
  },
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
};

import type { ComponentType } from 'react';

interface WrappableComponent {
  defaultProps?: Record<string, unknown>;
}

export const withTranslation =
  () => (Component: ComponentType & WrappableComponent) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };
    return Component;
  };

export const useTranslation = () => ({
  i18n: {
    changeLanguage: () => Promise.resolve(),
  },
  t: (str: string) => str,
});

export const initReactI18next = {
  init: () => undefined,
  type: '3rdParty',
};

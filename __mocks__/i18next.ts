const actual = jest.requireActual<typeof import('i18next')>('i18next');

export const t = (key: string) => key;

export default { ...actual.default, t };

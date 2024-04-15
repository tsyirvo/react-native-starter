export type FlagsmithValue<T = string | number | boolean | null> = T;

export type FlagOptions =
  | 'my-custom-flag'
  | 'is-maintenance-mode'
  | 'last-supported-app-version';

export type TraitOptions =
  | 'user-trait-1'
  | 'user-trait-2'
  | 'user-trait-3'
  | 'app-version'
  | 'os-name'
  | 'os-version';

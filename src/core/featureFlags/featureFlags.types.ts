export type FlagsmithValue<T = string | number | boolean | null> = T;

export type AvailableFeatureFlags =
  | 'is-maintenance-mode'
  | 'last-supported-app-version'
  | 'latest-released-app-version';

export type BooleanFeatureFlags = Extract<
  AvailableFeatureFlags,
  'is-maintenance-mode'
>;

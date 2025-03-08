export type AvailableFeatureFlags = 'is-maintenance-mode';

export type AvailableRemoteConfig =
  | 'last-supported-app-version'
  | 'latest-released-app-version';

export type BooleanFeatureFlags = Extract<
  AvailableFeatureFlags,
  'is-maintenance-mode'
>;

export type VersionFlagType = {
  version: string;
};

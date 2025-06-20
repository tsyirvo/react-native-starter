export type AvailableFeatureFlags = 'is-maintenance-mode';

export type AvailableRemoteConfig =
  | 'last-supported-app-version'
  | 'latest-released-app-version';

export type BooleanFeatureFlags = Extract<
  AvailableFeatureFlags,
  'is-maintenance-mode'
>;

export interface VersionFlagType {
  version: string;
}

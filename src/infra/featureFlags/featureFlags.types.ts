export type AvailableFeatureFlags = 'is-maintenance-mode';

export type AvailableRemoteConfig =
  | 'last-supported-app-version'
  | 'latest-released-app-version'
  | 'offering-to-display';

export type BooleanFeatureFlags = Extract<
  AvailableFeatureFlags,
  'is-maintenance-mode'
>;

export interface OfferingFlagType {
  type: 'offering';
  offering: string;
}

export interface VersionFlagType {
  type: 'version';
  version: string;
}

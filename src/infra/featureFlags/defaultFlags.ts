import type {
  AvailableFeatureFlags,
  AvailableRemoteConfig,
  VersionFlagType,
} from './featureFlags.types';

export const defaultFeatureFlags: Record<
  AvailableFeatureFlags,
  boolean | string
> = {
  'is-maintenance-mode': false,
};

export const defaultRemoteConfig: Record<
  AvailableRemoteConfig,
  VersionFlagType
> = {
  'last-supported-app-version': { type: 'version', version: '2.0.0' },
  'latest-released-app-version': { type: 'version', version: '2.1.0' },
};

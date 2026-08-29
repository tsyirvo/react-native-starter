import type {
  AvailableFeatureFlags,
  AvailableRemoteConfig,
  OfferingFlagType,
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
  VersionFlagType | OfferingFlagType
> = {
  'last-supported-app-version': { type: 'version', version: '2.0.0' },
  'latest-released-app-version': { type: 'version', version: '2.1.0' },
  'offering-to-display': { offering: 'default', type: 'offering' },
};

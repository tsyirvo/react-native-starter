import type { AvailableFeatureFlags } from './featureFlags.types';

export const defaultFlags: Record<
  AvailableFeatureFlags,
  { id?: number; enabled: boolean; value?: string | number | boolean | null }
> = {
  'is-maintenance-mode': { enabled: false },
  'last-supported-app-version': { enabled: true, value: '2.0.0' },
  'latest-released-app-version': { enabled: true, value: '2.1.0' },
};

import type { FlagOptions } from './featureFlags.types';

export const defaultFlags: Record<
  FlagOptions,
  { id?: number; enabled: boolean; value?: string | number | boolean | null }
> = {
  'my-custom-flag': { enabled: false },
  'is-maintenance-mode': { enabled: false },
  'last-supported-app-version': { enabled: true, value: '2.0.0' },
};

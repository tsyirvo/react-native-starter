import { lazy } from 'react';

export const SuspendedDebugStack = lazy(async () =>
  import('./DebugStack').then((module) => ({
    default: module.default,
  })),
);

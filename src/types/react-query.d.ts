/* eslint-disable filename-rules/match */

import type { QueryKey } from '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidates?: QueryKey[];
    };
  }
}

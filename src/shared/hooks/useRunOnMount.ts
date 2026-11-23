import type { EffectCallback } from 'react';
import { useEffect } from 'react';

export const useRunOnMount = (callback: EffectCallback) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: The hook intentionally runs its callback once on mount
  useEffect(callback, []);
};

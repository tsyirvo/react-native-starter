import { type EffectCallback, useEffect, useRef } from 'react';

export const useRunOnMount = (callback: EffectCallback) => {
  const hasRunRef = useRef(false);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true;
      const cleanup = callback();

      if (typeof cleanup === 'function') {
        cleanupRef.current = cleanup;
      }
    }

    return () => {
      cleanupRef.current?.();
    };
  }, [callback]);
};

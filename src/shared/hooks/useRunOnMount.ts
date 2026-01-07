import { type EffectCallback, useEffect } from 'react';

export const useRunOnMount = (callback: EffectCallback) => {
  // eslint-disable-next-line react-compiler/react-compiler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};

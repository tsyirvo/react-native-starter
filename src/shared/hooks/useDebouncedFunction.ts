import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef } from 'react';

type DebounceFn = typeof debounce;

export const useDebouncedFunction: DebounceFn = (
  fn,
  wait = 500,
  { maxWait, leading = true, trailing = false } = {},
) => {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  return useMemo(() => {
    const wrappedFn = (...args: Parameters<typeof fn>) =>
      fnRef.current(...args);

    return debounce(wrappedFn, wait, { leading, maxWait, trailing });
  }, [leading, maxWait, trailing, wait]);
};

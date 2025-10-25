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
    const wrappedFn = (...args: Parameters<typeof fn>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return fnRef.current(...args);
    };

    // eslint-disable-next-line react-hooks/refs
    return debounce(wrappedFn, wait, { leading, maxWait, trailing });
  }, [leading, maxWait, trailing, wait]);
};

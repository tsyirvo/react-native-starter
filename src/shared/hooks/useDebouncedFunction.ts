import { useEffect, useMemo, useRef } from 'react';

import {
  type DebouncedFunction,
  type DebounceOptions,
  debounce,
} from '$shared/utils';

export const useDebouncedFunction = <Args extends unknown[]>(
  fn: (...args: Args) => unknown,
  wait = 500,
  { leading = true, trailing = false }: DebounceOptions = {},
): DebouncedFunction<Args> => {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const debounced = useMemo(
    () =>
      debounce((...args: Args) => fnRef.current(...args), wait, {
        leading,
        trailing,
      }),
    [leading, trailing, wait],
  );

  useEffect(() => debounced.cancel, [debounced]);

  return debounced;
};

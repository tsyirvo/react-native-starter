export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export type DebouncedFunction<Args extends unknown[]> = ((
  ...args: Args
) => void) & {
  cancel: () => void;
};

export const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => unknown,
  wait: number,
  { leading = false, trailing = true }: DebounceOptions = {},
): DebouncedFunction<Args> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pendingArgs: Args | undefined;

  const debounced = (...args: Args) => {
    const isBurstStart = timer === undefined;

    if (timer !== undefined) {
      clearTimeout(timer);
    }

    if (leading && isBurstStart) {
      fn(...args);
    } else {
      pendingArgs = args;
    }

    timer = setTimeout(() => {
      timer = undefined;

      if (trailing && pendingArgs) {
        const argsToCall = pendingArgs;
        pendingArgs = undefined;
        fn(...argsToCall);
      }

      pendingArgs = undefined;
    }, wait);
  };

  debounced.cancel = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }

    timer = undefined;
    pendingArgs = undefined;
  };

  return debounced;
};

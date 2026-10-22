const storeResetFns = new Set<() => void>();

export const registerStoreReset = (resetFn: () => void) => {
  storeResetFns.add(resetFn);
};

export const resetStore = () => {
  for (const resetFn of storeResetFns) {
    resetFn();
  }
};

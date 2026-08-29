export const sliceResetFns = new Set<() => void>();

export const resetAllSlices = () => {
  for (const resetFn of sliceResetFns) {
    resetFn();
  }
};

export const sliceResetFns = new Set<() => void>();

export const resetAllSlices = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn();
  });
};

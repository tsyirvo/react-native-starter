export const isPromise = (value: unknown): value is Promise<unknown> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'then' in value &&
    typeof (value as { then: unknown }).then === 'function'
  );
};

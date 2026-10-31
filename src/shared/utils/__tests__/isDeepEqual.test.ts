import { isDeepEqual } from '../isDeepEqual';

describe('isDeepEqual', () => {
  it('compares nested plain objects and arrays structurally', () => {
    expect(
      isDeepEqual(
        { a: [1, { b: 'c' }], d: null },
        { a: [1, { b: 'c' }], d: null },
      ),
    ).toBe(true);
    expect(isDeepEqual({ a: [1, 2] }, { a: [1, 3] })).toBe(false);
    expect(isDeepEqual({ a: 1 }, { a: 1, b: undefined })).toBe(false);
  });

  it('handles primitives, NaN and dates', () => {
    expect(isDeepEqual(Number.NaN, Number.NaN)).toBe(true);
    expect(isDeepEqual(1, '1')).toBe(false);
    expect(isDeepEqual(new Date(0), new Date(0))).toBe(true);
    expect(isDeepEqual(new Date(0), new Date(1))).toBe(false);
  });

  it('compares other instances by reference', () => {
    expect(isDeepEqual(new Map(), new Map())).toBe(false);
    expect(isDeepEqual([], {})).toBe(false);
  });
});

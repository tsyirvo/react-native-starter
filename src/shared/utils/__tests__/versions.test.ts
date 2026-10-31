import { isVersionAtLeast, isVersionBelow } from '../versions';

describe('isVersionAtLeast', () => {
  it.each([
    ['1.2.3', '1.2.3', true],
    ['v1.2.3', '1.2.3', true],
    ['1.10.0', '1.9.9', true],
    ['1.2.3', '1.2.4', false],
    ['2.0.0', '10.0.0', false],
  ])('%s is at least %s: %s', (version, minimumVersion, expected) => {
    expect(isVersionAtLeast(version, minimumVersion)).toBe(expected);
  });
});

describe('isVersionBelow', () => {
  it.each([
    ['1.2.3', '1.2.4', true],
    ['2.0.0', '10.0.0', true],
    ['1.2.3', '1.2.3', false],
    ['v1.2.3', '1.2.3', false],
    ['1.10.0', '1.9.9', false],
  ])('%s is below %s: %s', (version, targetVersion, expected) => {
    expect(isVersionBelow(version, targetVersion)).toBe(expected);
  });
});

describe('version validation', () => {
  it.each(['1.2', '01.2.3', '1.2.3-beta.1', 'latest', ''])(
    'throws on the unsupported version "%s"',
    (version) => {
      expect(() => isVersionAtLeast(version, '1.0.0')).toThrow(TypeError);
      expect(() => isVersionBelow('1.0.0', version)).toThrow(TypeError);
    },
  );
});

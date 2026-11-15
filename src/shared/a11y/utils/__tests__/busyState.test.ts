import { busyLabel, busyRole, busyState } from '../busyState';

const mockPlatform = { isIOS: true };

jest.mock('$infra/config', () => ({
  get IS_IOS() {
    return mockPlatform.isIOS;
  },
}));

describe('busyState', () => {
  describe('on iOS', () => {
    beforeEach(() => {
      mockPlatform.isIOS = true;
    });

    it('removes the role of a busy element', () => {
      expect(busyRole(true, 'button')).toBeUndefined();
    });

    it('appends the busy text to the label of a busy element', () => {
      expect(busyLabel('Submit', true, 'busy')).toBe('Submit, busy');
    });

    it('keeps the busy flag out of the state', () => {
      expect(busyState(true, { disabled: true })).toEqual({ disabled: true });
    });
  });

  describe('on Android', () => {
    beforeEach(() => {
      mockPlatform.isIOS = false;
    });

    it('gives a busy element the progressbar role', () => {
      expect(busyRole(true, 'button')).toBe('progressbar');
    });

    it('keeps the label of a busy element unchanged', () => {
      expect(busyLabel('Submit', true, 'busy')).toBe('Submit');
    });

    it('adds the busy flag to the state', () => {
      expect(busyState(true, { disabled: true })).toEqual({
        busy: true,
        disabled: true,
      });
    });
  });

  it('keeps the role and label of an idle element on both platforms', () => {
    for (const isIOS of [true, false]) {
      mockPlatform.isIOS = isIOS;

      expect(busyRole(false, 'button')).toBe('button');
      expect(busyLabel('Submit', false, 'busy')).toBe('Submit');
    }
  });
});

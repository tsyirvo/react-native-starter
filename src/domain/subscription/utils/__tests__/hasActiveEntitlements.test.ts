import { hasActiveEntitlements } from '../hasActiveEntitlements';

describe('hasActiveEntitlements', () => {
  it('returns false when there are no active entitlements', () => {
    expect(hasActiveEntitlements({})).toBe(false);
  });

  it('returns true when an active entitlement exists', () => {
    expect(hasActiveEntitlements({ premium: { identifier: 'premium' } })).toBe(
      true,
    );
  });
});

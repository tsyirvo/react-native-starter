import RevenueCat, {
  type CustomerInfo,
  PACKAGE_TYPE,
  PRODUCT_TYPE,
  type PurchasesEntitlementInfo,
  type PurchasesPackage,
} from 'react-native-purchases';

import { ErrorMonitoring } from '$infra/monitoring';

import { Purchase } from '../purchase';

jest.mock('$infra/monitoring', () => ({
  ErrorMonitoring: { exception: jest.fn() },
}));

const user = { email: 'member@example.com', id: 'user-1' };
const entitlement: PurchasesEntitlementInfo = {
  billingIssueDetectedAt: null,
  billingIssueDetectedAtMillis: null,
  expirationDate: null,
  expirationDateMillis: null,
  identifier: 'premium',
  isActive: true,
  isSandbox: true,
  latestPurchaseDate: '2026-01-01T00:00:00Z',
  latestPurchaseDateMillis: 1_767_225_600_000,
  originalPurchaseDate: '2026-01-01T00:00:00Z',
  originalPurchaseDateMillis: 1_767_225_600_000,
  ownershipType: 'PURCHASED',
  periodType: 'NORMAL',
  productIdentifier: 'premium-monthly',
  productPlanIdentifier: null,
  store: 'APP_STORE',
  unsubscribeDetectedAt: null,
  unsubscribeDetectedAtMillis: null,
  verification: RevenueCat.VERIFICATION_RESULT.NOT_REQUESTED,
  willRenew: true,
};
const customerInfo: CustomerInfo = {
  activeSubscriptions: [],
  allExpirationDates: {},
  allPurchaseDates: {},
  allPurchasedProductIdentifiers: [],
  entitlements: {
    active: {},
    all: {},
    verification: RevenueCat.VERIFICATION_RESULT.NOT_REQUESTED,
  },
  firstSeen: '2026-01-01T00:00:00Z',
  latestExpirationDate: null,
  managementURL: null,
  nonSubscriptionTransactions: [],
  originalApplicationVersion: null,
  originalAppUserId: user.id,
  originalPurchaseDate: null,
  requestDate: '2026-01-01T00:00:00Z',
  subscriptionsByProductIdentifier: {},
};
const monthlyPackage: PurchasesPackage = {
  identifier: 'monthly',
  offeringIdentifier: 'default',
  packageType: PACKAGE_TYPE.MONTHLY,
  presentedOfferingContext: {
    offeringIdentifier: 'default',
    placementIdentifier: null,
    targetingContext: null,
  },
  product: {
    currencyCode: 'USD',
    defaultOption: null,
    description: 'Premium subscription',
    discounts: null,
    identifier: 'premium-monthly',
    introPrice: null,
    presentedOfferingContext: null,
    presentedOfferingIdentifier: 'default',
    price: 5,
    pricePerMonth: 5,
    pricePerMonthString: '$5.00',
    pricePerWeek: null,
    pricePerWeekString: null,
    pricePerYear: null,
    pricePerYearString: null,
    priceString: '$5.00',
    productCategory: null,
    productType: PRODUCT_TYPE.AUTO_RENEWABLE_SUBSCRIPTION,
    subscriptionOptions: null,
    subscriptionPeriod: 'P1M',
    title: 'Premium',
  },
  webCheckoutUrl: null,
};

describe('Purchase', () => {
  beforeEach(() => jest.resetAllMocks());

  it('waits for login before associating the email and analytics identity', async () => {
    const login =
      Promise.withResolvers<Awaited<ReturnType<typeof RevenueCat.logIn>>>();
    jest.mocked(RevenueCat.logIn).mockReturnValue(login.promise);

    const completion = Purchase.setUser(user);

    expect(RevenueCat.logIn).toHaveBeenCalledWith('user-1');
    expect(RevenueCat.setEmail).not.toHaveBeenCalled();
    expect(RevenueCat.setAttributes).not.toHaveBeenCalled();
    login.resolve({ created: false, customerInfo });
    await completion;

    expect(RevenueCat.setEmail).toHaveBeenCalledWith('member@example.com');
    expect(RevenueCat.setAttributes).toHaveBeenCalledWith({
      $posthogUserId: 'user-1',
    });
  });

  it('propagates a failed login without writing identity attributes', async () => {
    const error = new Error('purchase identity unavailable');
    jest.mocked(RevenueCat.logIn).mockRejectedValueOnce(error);

    await expect(Purchase.setUser(user)).rejects.toBe(error);

    expect(RevenueCat.setEmail).not.toHaveBeenCalled();
    expect(RevenueCat.setAttributes).not.toHaveBeenCalled();
  });

  it('keeps identity setup pending until email and attributes have been written', async () => {
    const attributes = Promise.withResolvers<void>();
    jest.mocked(RevenueCat.setAttributes).mockReturnValue(attributes.promise);
    let isReady = false;
    const completion = Purchase.setUser(user).then(() => {
      isReady = true;
    });
    await Promise.resolve();
    await Promise.resolve();
    expect(RevenueCat.setAttributes).toHaveBeenCalledWith({
      $posthogUserId: 'user-1',
    });
    expect(isReady).toBe(false);

    attributes.resolve();
    await completion;
    expect(isReady).toBe(true);
  });

  it('propagates logout failures to its caller', async () => {
    const error = new Error('logout unavailable');
    jest.mocked(RevenueCat.logOut).mockRejectedValueOnce(error);

    await expect(Purchase.clearUser()).rejects.toBe(error);
    expect(RevenueCat.logOut).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['none', {}, false],
    ['premium', { premium: entitlement }, true],
  ] as const)(
    'reports paying status for active entitlements: %s',
    async (_name, active, expected) => {
      jest.mocked(RevenueCat.getCustomerInfo).mockResolvedValue({
        ...customerInfo,
        entitlements: { ...customerInfo.entitlements, active },
      });

      await expect(Purchase.isPayingUser()).resolves.toBe(expected);
      expect(RevenueCat.getCustomerInfo).toHaveBeenCalledTimes(1);
    },
  );

  it('removes exactly the customer listener that it registered', () => {
    const listener = jest.fn();

    const unsubscribe = Purchase.customerListener(listener);

    expect(RevenueCat.addCustomerInfoUpdateListener).toHaveBeenCalledWith(
      listener,
    );
    expect(RevenueCat.removeCustomerInfoUpdateListener).not.toHaveBeenCalled();
    unsubscribe();
    expect(RevenueCat.removeCustomerInfoUpdateListener).toHaveBeenCalledTimes(
      1,
    );
    expect(RevenueCat.removeCustomerInfoUpdateListener).toHaveBeenCalledWith(
      listener,
    );
  });

  it('reports a failed package purchase without rejecting', async () => {
    const error = new Error('purchase unavailable');
    jest.mocked(RevenueCat.purchasePackage).mockRejectedValueOnce(error);

    await expect(
      Purchase.makePurchase(monthlyPackage),
    ).resolves.toBeUndefined();

    expect(RevenueCat.purchasePackage).toHaveBeenCalledWith(monthlyPackage);
    expect(ErrorMonitoring.exception).toHaveBeenCalledWith(error);
  });
});

import type { LOG_LEVEL, PurchasesPackage } from 'react-native-purchases';
import Purchases from 'react-native-purchases';

import { IS_IOS, config } from '$core/constants';
import { Logger } from '$core/logger';

import type { SubscriptionEntitlementType } from './subscriptions.types';

const API_KEY = IS_IOS
  ? config.revenueCatAppleApiKey
  : config.revenueCatAndroidApiKey;

class SubscriptionClass {
  /* ***** *****  Setup  ***** ***** */

  init() {
    Purchases.configure({ apiKey: API_KEY });
  }

  async setLogLevel(logLevel: LOG_LEVEL) {
    await Purchases.setLogLevel(logLevel);
  }

  /* ***** *****  User related  ***** ***** */

  async setUser(appUserID: string) {
    await Purchases.logIn(appUserID);
  }

  async setAttributes(attributes: Record<string, string | null>) {
    await Purchases.setAttributes(attributes);
  }

  async getUserInformations() {
    return await Purchases.getCustomerInfo();
  }

  /* ***** *****  Purchases  ***** ***** */

  async getOfferings() {
    const offerings = await Purchases.getOfferings();

    return offerings.current;
  }

  async restorePurchases() {
    await Purchases.restorePurchases();
  }

  async makePurchase({
    purchasedPackage,
    subscriptionEntitlement,
  }: {
    purchasedPackage: PurchasesPackage;
    subscriptionEntitlement: SubscriptionEntitlementType;
  }) {
    try {
      const { customerInfo } =
        await Purchases.purchasePackage(purchasedPackage);

      if (customerInfo.entitlements.active[subscriptionEntitlement]) {
        return { isPurchaseSuccessful: true };
      }

      return { isPurchaseSuccessful: false };
    } catch (error) {
      Logger.error({ error, message: 'Failed to purchase package' });

      return { isPurchaseSuccessful: false };
    }
  }
}

export const Subscriptions = new SubscriptionClass();

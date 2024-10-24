import type { LOG_LEVEL, PurchasesPackage } from 'react-native-purchases';
import RevenueCat from 'react-native-purchases';

import { IS_IOS, config } from '$core/constants';
import { Logger } from '$core/logger';

import type { EntitlementsType } from './purchase.types';

const API_KEY = IS_IOS
  ? config.revenueCatAppleApiKey
  : config.revenueCatAndroidApiKey;

class PurchaseClass {
  /* ***** *****  Setup  ***** ***** */

  init() {
    RevenueCat.configure({ apiKey: API_KEY });
  }

  async setLogLevel(logLevel: LOG_LEVEL) {
    await RevenueCat.setLogLevel(logLevel);
  }

  /* ***** *****  User related  ***** ***** */

  async setUser(appUserID: string) {
    await RevenueCat.logIn(appUserID);
  }

  async setAttributes(attributes: Record<string, string | null>) {
    await RevenueCat.setAttributes(attributes);
  }

  async getUserInformations() {
    return await RevenueCat.getCustomerInfo();
  }

  /* ***** *****  RevenueCat  ***** ***** */

  async getOfferings() {
    const offerings = await RevenueCat.getOfferings();

    return offerings.current;
  }

  async restorePurchases() {
    await RevenueCat.restorePurchases();
  }

  async makePurchase({
    purchasedPackage,
    entitlement,
  }: {
    purchasedPackage: PurchasesPackage;
    entitlement: EntitlementsType;
  }) {
    try {
      const { customerInfo } =
        await RevenueCat.purchasePackage(purchasedPackage);

      if (customerInfo.entitlements.active[entitlement]) {
        return { isPurchaseSuccessful: true };
      }

      return { isPurchaseSuccessful: false };
    } catch (error) {
      Logger.error({ error, message: 'Failed to purchase package' });

      return { isPurchaseSuccessful: false };
    }
  }
}

export const Purchase = new PurchaseClass();

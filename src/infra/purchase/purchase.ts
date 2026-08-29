import type {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesPackage,
} from 'react-native-purchases';
import RevenueCat, {
  LOG_LEVEL as PURCHASES_LOG_LEVEL,
} from 'react-native-purchases';

import { config, IS_IOS } from '$domain/constants';
import type { User } from '$domain/entities';
import { hasActiveEntitlements } from '$domain/subscription';
import { ErrorMonitoring } from '$infra/monitoring';

const API_KEY = IS_IOS
  ? config.revenueCatAppleApiKey
  : config.revenueCatAndroidApiKey;

class PurchaseClass {
  /* ***** *****  Setup  ***** ***** */

  init() {
    RevenueCat.configure({ apiKey: API_KEY });

    void this.setLogLevel(PURCHASES_LOG_LEVEL.ERROR);
  }

  async setLogLevel(logLevel: LOG_LEVEL) {
    await RevenueCat.setLogLevel(logLevel);
  }

  /* ***** *****  User related  ***** ***** */

  async setUser(user: User) {
    await RevenueCat.logIn(user.id);
    await RevenueCat.setEmail(user.email);
    await this.setAttributes({
      $posthogUserId: user.id,
    });
  }

  async clearUser() {
    await RevenueCat.logOut();
  }

  async setAttributes(attributes: Record<string, string | null>) {
    await RevenueCat.setAttributes(attributes);
  }

  async invalidateUserInformationsCache() {
    await RevenueCat.invalidateCustomerInfoCache();
  }

  async getUserInformations() {
    return await RevenueCat.getCustomerInfo();
  }

  async isPayingUser() {
    const customerInfo = await this.getUserInformations();

    return hasActiveEntitlements(customerInfo);
  }

  /* ***** *****  RevenueCat  ***** ***** */

  async getOfferings() {
    return await RevenueCat.getOfferings();
  }

  async restorePurchases() {
    await RevenueCat.restorePurchases();
  }

  async syncPurchases() {
    await RevenueCat.syncPurchasesForResult();
  }

  async makePurchase(purchasedPackage: PurchasesPackage) {
    try {
      await RevenueCat.purchasePackage(purchasedPackage);
    } catch (error) {
      ErrorMonitoring.exception(error);
    }
  }

  /* ***** *****  Listeners  ***** ***** */

  customerListener(callback: (customerInfo: CustomerInfo) => void) {
    RevenueCat.addCustomerInfoUpdateListener(callback);

    return () => {
      RevenueCat.removeCustomerInfoUpdateListener(callback);
    };
  }
}

export const Purchase = new PurchaseClass();

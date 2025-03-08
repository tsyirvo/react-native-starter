import type {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesPackage,
} from 'react-native-purchases';
import RevenueCat from 'react-native-purchases';

import { IS_IOS, config } from '$domain/constants';
import { ErrorMonitoring } from '$infra/monitoring';

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

  /* ***** *****  RevenueCat  ***** ***** */

  async getOfferings() {
    const offerings = await RevenueCat.getOfferings();

    return offerings.current;
  }

  async restorePurchases() {
    await RevenueCat.restorePurchases();
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
  }
}

export const Purchase = new PurchaseClass();

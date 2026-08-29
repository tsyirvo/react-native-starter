import type { CustomerInfo } from 'react-native-purchases';

export const hasActiveEntitlements = (customerInfo: CustomerInfo): boolean =>
  Object.entries(customerInfo.entitlements.active).length > 0;

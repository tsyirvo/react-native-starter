import { CustomerInfo } from 'react-native-purchases';

export const hasActiveEntitlements = (customerInfo: CustomerInfo): boolean => {
  return Object.entries(customerInfo.entitlements.active).length > 0;
};

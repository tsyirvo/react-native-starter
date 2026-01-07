import { createContext } from 'react';
import { PurchasesOffering } from 'react-native-purchases';

const SubscriptionContext = createContext<{
  isPayingUser: boolean | null;
  offeringToDisplay: PurchasesOffering | null;
}>({
  isPayingUser: null,
  offeringToDisplay: null,
});

export default SubscriptionContext;

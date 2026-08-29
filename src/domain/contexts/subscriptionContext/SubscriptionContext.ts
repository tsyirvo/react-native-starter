import { createContext } from 'react';
import type { PurchasesOffering } from 'react-native-purchases';

const SubscriptionContext = createContext<{
  isPayingUser: boolean | null;
  offeringToDisplay: PurchasesOffering | null;
  handleSetIsPayingUser: (value: boolean) => void;
}>({
  handleSetIsPayingUser: () => null,
  isPayingUser: null,
  offeringToDisplay: null,
});

export default SubscriptionContext;

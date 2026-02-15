import { createContext } from 'react';
import { PurchasesOffering } from 'react-native-purchases';

const SubscriptionContext = createContext<{
  isPayingUser: boolean | null;
  offeringToDisplay: PurchasesOffering | null;
  handleSetIsPayingUser: (value: boolean) => void;
}>({
  isPayingUser: null,
  offeringToDisplay: null,
  handleSetIsPayingUser: () => null,
});

export default SubscriptionContext;

import { useContext } from 'react';

import SubscriptionContext from '../contexts/subscriptionContext/SubscriptionContext';

export const useSubscriptionContext = () => {
  const value = useContext(SubscriptionContext);

  return value;
};

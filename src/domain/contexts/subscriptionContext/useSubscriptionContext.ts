import { useContext } from 'react';

import SubscriptionContext from './SubscriptionContext';

export const useSubscriptionContext = () => {
  const value = useContext(SubscriptionContext);

  return value;
};

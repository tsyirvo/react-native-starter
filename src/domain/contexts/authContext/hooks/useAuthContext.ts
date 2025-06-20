import { useContext } from 'react';

import AuthContext from '../AuthContext';

export const useAuthSession = () => {
  const value = useContext(AuthContext);

  return value;
};

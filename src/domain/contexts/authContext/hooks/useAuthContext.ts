import { useContext } from 'react';

import AuthContext from '../AuthContext';

export const useAuthContext = () => {
  const value = useContext(AuthContext);

  return value;
};

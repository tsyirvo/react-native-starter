import { useContext } from 'react';

import AuthContext from '../contexts/authContext/AuthContext';

export const useAuthContext = () => {
  const value = useContext(AuthContext);

  return value;
};

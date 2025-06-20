import { createContext } from 'react';

import { User, UserLogin } from '$domain/entities';

const AuthContext = createContext<{
  user: User | null;
  signIn: (data: UserLogin) => Promise<void>;
  signOut: () => Promise<void>;
}>({
  user: null,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

export default AuthContext;

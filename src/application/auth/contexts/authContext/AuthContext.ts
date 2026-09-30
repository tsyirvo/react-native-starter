import { createContext } from 'react';

import type { User, UserLogin } from '$domain/entities';

const AuthContext = createContext<{
  isPurchaseUserReady: boolean;
  user: User | null;
  signIn: (data: UserLogin) => Promise<void>;
  signOut: () => Promise<void>;
}>({
  isPurchaseUserReady: false,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  user: null,
});

export default AuthContext;

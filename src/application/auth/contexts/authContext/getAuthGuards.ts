import type { User } from '$domain/entities';

export const getAuthGuards = (user: User | null) => ({
  isAnonymous: user === null,
  isAuthenticated: user !== null,
});

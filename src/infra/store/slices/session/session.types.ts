export interface SessionState {
  isUserLoggedIn: boolean;
}

interface SessionActions {
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
}

export type SessionSlice = SessionState & SessionActions;

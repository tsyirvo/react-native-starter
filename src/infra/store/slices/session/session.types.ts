export type SessionState = {
  isUserLoggedIn: boolean;
};

type SessionActions = {
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
};

export type SessionSlice = SessionState & SessionActions;

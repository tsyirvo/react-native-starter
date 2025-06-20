/* ***** *****  Main entity  ***** ***** */

export interface User {
  id: string;
  email: string;
}

/* ***** *****  Queries and Mutations  ***** ***** */

export interface UserLogin {
  email: string;
  password: string;
}

/* ***** *****  Main entity  ***** ***** */

export interface User {
  email: string;
  id: string;
}

/* ***** *****  Queries and Mutations  ***** ***** */

export interface UserLogin {
  email: string;
  password: string;
}

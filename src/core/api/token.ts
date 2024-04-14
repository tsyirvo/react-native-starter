import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

import { sleep } from '$shared/utils/sleep';

type SecureStoreKeys = 'jwtToken' | 'refreshToken';

const ONE_SECOND = 1_000;

/* ***** *****  Secure store  ***** ***** */

const saveToSecureStore = async (key: SecureStoreKeys, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

const getFromSecureStore = async (key: SecureStoreKeys) => {
  const result = await SecureStore.getItemAsync(key);

  return result ?? null;
};

/* ***** *****  Cached token  ***** ***** */

let cachedAccessToken: string | null = null;

const setCachedAccessToken = (accessToken: string) => {
  cachedAccessToken = accessToken;
};

const getCachedAccessToken = () => {
  return cachedAccessToken;
};

/* ***** *****  Token auth header  ***** ***** */

export const getAuthorizationHeader = async () => {
  const accessToken = getCachedAccessToken();

  if (accessToken) {
    return `Bearer ${accessToken}`;
  }

  const currentAccessToken = await getFromSecureStore('jwtToken');

  if (currentAccessToken) {
    setCachedAccessToken(currentAccessToken);
  }

  return currentAccessToken ? `Bearer ${currentAccessToken}` : '';
};

/* ***** *****  Token handling  ***** ***** */

// TODO(prod): Add actual refresh logic
const refreshToken = async () => {
  await sleep(ONE_SECOND);

  const newToken = 'newToken';

  setCachedAccessToken(newToken);
  await saveToSecureStore('jwtToken', newToken);

  return newToken;
};

export const checkIfTokenExpiredAndRefresh = async () => {
  const token = await getFromSecureStore('jwtToken');

  if (!token) {
    return null;
  }

  const decodedToken = token ? jwtDecode(token) : null;
  const currentTime = Date.now() / ONE_SECOND; // Convert to seconds

  if (decodedToken?.exp && decodedToken.exp < currentTime) {
    const refreshedToken = await refreshToken();

    setCachedAccessToken(refreshedToken);

    return refreshedToken;
  }

  return token;
};

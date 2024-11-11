import * as SecureStore from 'expo-secure-store';

import { sleep } from '$shared/utils/sleep';

type SecureStoreKeys = 'jwtToken' | 'refreshToken';

const ONE_SECOND = 1_000;

/* ***** *****  Secure store  ***** ***** */

const saveToSecureStore = async (key: SecureStoreKeys, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

const getFromSecureStore = async (key: SecureStoreKeys) => {
  const result = await SecureStore.getItemAsync(key);

  return result;
};

const deleteFromSecureStore = async (key: SecureStoreKeys) => {
  await SecureStore.deleteItemAsync(key);
};

/* ***** *****  Cached token  ***** ***** */

let cachedAccessToken: string | null = null;
let cachedRefreshToken: string | null = null;

const setCachedRefreshToken = (refreshToken: string) => {
  cachedRefreshToken = refreshToken;
};

const getCachedRefreshToken = () => cachedRefreshToken;

const clearCachedRefreshToken = () => {
  cachedRefreshToken = null;
};

const setCachedAccessToken = (accessToken: string) => {
  cachedAccessToken = accessToken;
};

const getCachedAccessToken = () => cachedAccessToken;

const clearCachedAccessToken = () => {
  cachedAccessToken = null;
};

/* ***** *****  Token utils  ***** ***** */

export const saveNewAccessToken = async (token: string) => {
  setCachedAccessToken(token);
  await saveToSecureStore('jwtToken', token);
};

export const saveNewRefreshToken = async (token: string) => {
  setCachedRefreshToken(token);
  await saveToSecureStore('refreshToken', token);
};

export const clearTokens = async () => {
  clearCachedAccessToken();
  clearCachedRefreshToken();

  await Promise.all([
    deleteFromSecureStore('jwtToken'),
    deleteFromSecureStore('refreshToken'),
  ]);
};

/* ***** *****  Token auth header  ***** ***** */

export const getAuthorizationHeader = async () => {
  const accessToken = getCachedAccessToken();

  if (accessToken) return `Bearer ${accessToken}`;

  const currentAccessToken = await getFromSecureStore('jwtToken');

  if (!currentAccessToken) return '';

  setCachedAccessToken(currentAccessToken);

  return `Bearer ${currentAccessToken}`;
};

/* ***** *****  Token handling  ***** ***** */

// TODO(prod): Add actual refresh logic
export const refreshToken = async () => {
  getCachedRefreshToken();

  await sleep(ONE_SECOND);

  const accessToken = 'newAccessToken';
  const newRefreshToken = 'newRefreshToken';

  await Promise.all([
    saveNewAccessToken(accessToken),
    saveNewRefreshToken(newRefreshToken),
  ]);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

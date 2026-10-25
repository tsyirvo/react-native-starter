import * as SecureStore from 'expo-secure-store';

import {
  clearAccessAndRefreshTokens,
  getAuthorizationHeader,
  saveNewAccessToken,
  saveNewRefreshToken,
} from '../token';

describe('token storage', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    await clearAccessAndRefreshTokens();
    jest.clearAllMocks();
  });

  it('loads a stored access token once and reuses the cached authorization header', async () => {
    jest
      .mocked(SecureStore.getItemAsync)
      .mockResolvedValue('stored-access-token');

    await expect(getAuthorizationHeader()).resolves.toBe(
      'Bearer stored-access-token',
    );
    await expect(getAuthorizationHeader()).resolves.toBe(
      'Bearer stored-access-token',
    );

    expect(SecureStore.getItemAsync).toHaveBeenCalledTimes(1);
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('jwtToken');
  });

  it('persists new tokens under separate keys and uses the latest access token immediately', async () => {
    await saveNewAccessToken('new-access-token');
    await saveNewRefreshToken('new-refresh-token');

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'jwtToken',
      'new-access-token',
    );
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'refreshToken',
      'new-refresh-token',
    );
    await expect(getAuthorizationHeader()).resolves.toBe(
      'Bearer new-access-token',
    );
    expect(SecureStore.getItemAsync).not.toHaveBeenCalled();
  });

  it('returns no authorization header when storage has no token', async () => {
    jest.mocked(SecureStore.getItemAsync).mockResolvedValue(null);

    await expect(getAuthorizationHeader()).resolves.toBe('');
  });

  it('clears both stored tokens and stops reusing the cached access token', async () => {
    await saveNewAccessToken('old-access-token');
    await saveNewRefreshToken('old-refresh-token');
    jest.mocked(SecureStore.getItemAsync).mockResolvedValue(null);

    await clearAccessAndRefreshTokens();

    expect(SecureStore.deleteItemAsync).toHaveBeenCalledTimes(2);
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('jwtToken');
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('refreshToken');
    await expect(getAuthorizationHeader()).resolves.toBe('');
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('jwtToken');
  });

  it('propagates storage failures and clears memory even when deletion fails', async () => {
    const error = new Error('secure storage unavailable');
    await saveNewAccessToken('old-access-token');
    jest.mocked(SecureStore.deleteItemAsync).mockRejectedValueOnce(error);

    await expect(clearAccessAndRefreshTokens()).rejects.toBe(error);
    jest.mocked(SecureStore.getItemAsync).mockRejectedValueOnce(error);
    await expect(getAuthorizationHeader()).rejects.toBe(error);
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('jwtToken');
  });
});

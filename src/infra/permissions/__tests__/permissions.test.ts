import {
  check,
  checkNotifications,
  PERMISSIONS,
  RESULTS,
  request,
  requestNotifications,
} from 'react-native-permissions';

import { Permissions } from '../permissions';

describe('Permissions', () => {
  beforeEach(() => jest.resetAllMocks());

  it.each([
    [
      RESULTS.UNAVAILABLE,
      { isAvailable: false, isGranted: false, isRequestable: false },
    ],
    [
      RESULTS.DENIED,
      { isAvailable: true, isGranted: false, isRequestable: true },
    ],
    [
      RESULTS.BLOCKED,
      { isAvailable: true, isGranted: false, isRequestable: false },
    ],
    [
      RESULTS.GRANTED,
      { isAvailable: true, isGranted: true, isRequestable: false },
    ],
    [
      RESULTS.LIMITED,
      { isAvailable: true, isGranted: true, isRequestable: false },
    ],
  ])('maps the SDK status %s to app capabilities', async (status, expected) => {
    jest.mocked(check).mockResolvedValue(status);

    await expect(
      Permissions.checkStatus(PERMISSIONS.IOS.CAMERA),
    ).resolves.toEqual(expected);
    expect(check).toHaveBeenCalledWith(PERMISSIONS.IOS.CAMERA);
  });

  it('requests the specified permission and decodes the response', async () => {
    jest.mocked(request).mockResolvedValue(RESULTS.BLOCKED);

    await expect(
      Permissions.request(PERMISSIONS.ANDROID.CAMERA),
    ).resolves.toEqual({
      isAvailable: true,
      isGranted: false,
      isRequestable: false,
    });
    expect(request).toHaveBeenCalledWith(PERMISSIONS.ANDROID.CAMERA);
  });

  it('decodes notification checks and requests alerts, badges and sounds', async () => {
    jest
      .mocked(checkNotifications)
      .mockResolvedValue({ settings: {}, status: RESULTS.DENIED });
    jest
      .mocked(requestNotifications)
      .mockResolvedValue({ settings: {}, status: RESULTS.GRANTED });

    await expect(Permissions.checkNotificationsStatus()).resolves.toEqual({
      isAvailable: true,
      isGranted: false,
      isRequestable: true,
    });
    await expect(Permissions.requestNotifications()).resolves.toEqual({
      isAvailable: true,
      isGranted: true,
      isRequestable: false,
    });
    expect(requestNotifications).toHaveBeenCalledWith([
      'alert',
      'badge',
      'sound',
    ]);
  });

  it('propagates SDK failures rather than reporting permission denial', async () => {
    const error = new Error('permissions unavailable');
    jest.mocked(check).mockRejectedValue(error);
    jest.mocked(requestNotifications).mockRejectedValue(error);

    await expect(Permissions.checkStatus(PERMISSIONS.IOS.CAMERA)).rejects.toBe(
      error,
    );
    await expect(Permissions.requestNotifications()).rejects.toBe(error);
  });
});

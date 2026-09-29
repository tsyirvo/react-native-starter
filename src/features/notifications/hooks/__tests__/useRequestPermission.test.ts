import { PERMISSIONS } from 'react-native-permissions';

import { renderHook } from '$domain/testing';
import { Permissions } from '$infra/permissions';
import { Toaster } from '$infra/toaster';

import { useRequestPermission } from '../useRequestPermission';

jest.mock('i18next', () => ({ t: (key: string) => key }));
jest.mock('$infra/logger', () => ({ Logger: { dev: jest.fn() } }));
jest.mock('$infra/permissions', () => ({
  Permissions: {
    checkNotificationsStatus: jest.fn(),
    checkStatus: jest.fn(),
    request: jest.fn(),
    requestNotifications: jest.fn(),
  },
}));
jest.mock('$infra/toaster', () => ({ Toaster: { show: jest.fn() } }));

const granted = { isAvailable: true, isGranted: true, isRequestable: false };
const requestable = {
  isAvailable: true,
  isGranted: false,
  isRequestable: true,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useRequestPermission', () => {
  it('requests notification permission and reports success when granted', async () => {
    jest
      .mocked(Permissions.checkNotificationsStatus)
      .mockResolvedValue(requestable);
    jest.mocked(Permissions.requestNotifications).mockResolvedValue(granted);
    const { result } = renderHook(useRequestPermission);

    await result.current.requestNotificationPermission();

    expect(Permissions.requestNotifications).toHaveBeenCalledTimes(1);
    expect(Toaster.show).toHaveBeenCalledWith({
      text1: 'featuresScreen.notificationsPermission.success',
      type: 'success',
    });
  });

  it('does not request a permission that is already granted', async () => {
    jest.mocked(Permissions.checkStatus).mockResolvedValue(granted);
    const { result } = renderHook(useRequestPermission);

    await result.current.requestPermission(PERMISSIONS.IOS.CAMERA);

    expect(Permissions.checkStatus).toHaveBeenCalledWith(
      PERMISSIONS.IOS.CAMERA,
    );
    expect(Permissions.request).not.toHaveBeenCalled();
    expect(Toaster.show).toHaveBeenCalledWith({
      text1: 'featuresScreen.notificationsPermission.alreadyGranted',
      type: 'success',
    });
  });

  it('reports blocked notification permission without requesting it again', async () => {
    jest.mocked(Permissions.checkNotificationsStatus).mockResolvedValue({
      isAvailable: true,
      isGranted: false,
      isRequestable: false,
    });
    const { result } = renderHook(useRequestPermission);

    await result.current.requestNotificationPermission();

    expect(Permissions.requestNotifications).not.toHaveBeenCalled();
    expect(Toaster.show).toHaveBeenCalledWith({
      text1: 'appConfig.permissions.notGranted',
      type: 'error',
    });
  });

  it('reports unavailable permission without requesting it', async () => {
    jest.mocked(Permissions.checkStatus).mockResolvedValue({
      isAvailable: false,
      isGranted: false,
      isRequestable: false,
    });
    const { result } = renderHook(useRequestPermission);

    await result.current.requestPermission(PERMISSIONS.IOS.CAMERA);

    expect(Permissions.request).not.toHaveBeenCalled();
    expect(Toaster.show).toHaveBeenCalledWith({
      text1: 'appConfig.permissions.notAvailable',
      type: 'error',
    });
  });

  it('reports a refused permission request', async () => {
    jest.mocked(Permissions.checkStatus).mockResolvedValue(requestable);
    jest.mocked(Permissions.request).mockResolvedValue({
      isAvailable: true,
      isGranted: false,
      isRequestable: false,
    });
    const { result } = renderHook(useRequestPermission);

    await result.current.requestPermission(PERMISSIONS.IOS.CAMERA);

    expect(Permissions.request).toHaveBeenCalledWith(PERMISSIONS.IOS.CAMERA);
    expect(Toaster.show).toHaveBeenCalledWith({
      text1: 'appConfig.permissions.notGranted',
      type: 'error',
    });
  });

  it('propagates rejected permission checks to the caller', async () => {
    const error = new Error('permission check failed');
    jest.mocked(Permissions.checkNotificationsStatus).mockRejectedValue(error);
    const { result } = renderHook(useRequestPermission);

    await expect(result.current.requestNotificationPermission()).rejects.toBe(
      error,
    );
    expect(Permissions.requestNotifications).not.toHaveBeenCalled();
    expect(Toaster.show).not.toHaveBeenCalled();
  });

  it('propagates rejected permission requests to the caller', async () => {
    const error = new Error('permission request failed');
    jest.mocked(Permissions.checkStatus).mockResolvedValue(requestable);
    jest.mocked(Permissions.request).mockRejectedValue(error);
    const { result } = renderHook(useRequestPermission);

    await expect(
      result.current.requestPermission(PERMISSIONS.IOS.CAMERA),
    ).rejects.toBe(error);
    expect(Toaster.show).not.toHaveBeenCalled();
  });
});

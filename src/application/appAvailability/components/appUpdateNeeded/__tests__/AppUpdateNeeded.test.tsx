import { Linking } from 'react-native';

import * as Config from '$infra/config';
import { useGetRemoteConfigSync } from '$infra/featureFlags';
import { Logger } from '$infra/logger';
import { render, screen, userEvent, waitFor } from '$testing';

import { AppUpdateNeeded } from '../AppUpdateNeeded';

jest.mock('$infra/featureFlags', () => ({ useGetRemoteConfigSync: jest.fn() }));

const getFlagPayloadSync = jest.fn();

describe('AppUpdateNeeded', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.replaceProperty(Config.config, 'version', '2.0.0');
    getFlagPayloadSync.mockReturnValue(undefined);
    jest.mocked(useGetRemoteConfigSync).mockReturnValue({ getFlagPayloadSync });
    jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('does not block the app when the remote version is absent', async () => {
    await render(<AppUpdateNeeded />);

    expect(
      screen.queryByTestId('appUpdateNeeded-screen'),
    ).not.toBeOnTheScreen();
    expect(getFlagPayloadSync).toHaveBeenCalledWith(
      'last-supported-app-version',
    );
  });

  it.each(['2.0.0', '1.0.0'])(
    'does not block a supported app for minimum version %s',
    async (version) => {
      getFlagPayloadSync.mockReturnValue({ type: 'version', version });
      await render(<AppUpdateNeeded />);

      expect(
        screen.queryByTestId('appUpdateNeeded-screen'),
      ).not.toBeOnTheScreen();
    },
  );

  it.each([
    [true, 'https://apps.apple.com/app/123456789'],
    [false, 'market://details?id=com.example.starter&showAllReviews=true'],
  ])(
    'blocks an unsupported app and opens its store (iOS: %s)',
    async (isIOS, url) => {
      jest.replaceProperty(Config, 'IS_IOS', isIOS);
      getFlagPayloadSync.mockReturnValue({ type: 'version', version: '3.0.0' });
      const user = userEvent.setup();
      await render(<AppUpdateNeeded />);

      expect(screen.getByText('appUpdateNedeed.title')).toBeOnTheScreen();
      await user.press(screen.getByText('appUpdateNedeed.cta'));

      expect(Linking.openURL).toHaveBeenCalledTimes(1);
      expect(Linking.openURL).toHaveBeenCalledWith(url);
    },
  );

  it('reports store-opening failures without dismissing the required update', async () => {
    const error = new Error('store unavailable');
    jest.mocked(Linking.openURL).mockRejectedValueOnce(error);
    getFlagPayloadSync.mockReturnValue({ type: 'version', version: '3.0.0' });
    const user = userEvent.setup();
    await render(<AppUpdateNeeded />);

    await user.press(screen.getByText('appUpdateNedeed.cta'));

    await waitFor(() =>
      expect(Logger.error).toHaveBeenCalledWith({
        error,
        message: 'Failed to open app store to update the app',
      }),
    );
    expect(screen.getByText('appUpdateNedeed.title')).toBeOnTheScreen();
  });
});

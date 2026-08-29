import { Linking } from 'react-native';

import { config } from '$domain/constants/config';
import { fireEvent, render, screen, waitFor } from '$domain/testing';
import * as FeatureFlags from '$infra/featureFlags/hooks/useGetRemoteConfigSync';

import { AppUpdateNeeded } from '../AppUpdateNeeded';

describe('AppUpdateNeeded component', () => {
  jest.spyOn(FeatureFlags, 'useGetRemoteConfigSync').mockReturnValue({
    getFlagPayloadSync: () => undefined,
  });

  afterEach(() => jest.resetAllMocks);

  it('should render nothing if the flag is empty', () => {
    render(<AppUpdateNeeded />);

    expect(screen.queryByTestId('appUpdateNeeded-screen')).toBeNull();
  });

  it('should render nothing if the versions are equal', () => {
    jest.spyOn(FeatureFlags, 'useGetRemoteConfigSync').mockReturnValue({
      getFlagPayloadSync: <T = { type: 'version'; version: string }>() =>
        ({ type: 'version', version: '2.0.0' }) as T,
    });

    config.version = '2.0.0';

    render(<AppUpdateNeeded />);

    expect(screen.queryByTestId('appUpdateNeeded-screen')).toBeNull();
  });

  it('should render nothing if the flagged version is supported', () => {
    jest.spyOn(FeatureFlags, 'useGetRemoteConfigSync').mockReturnValue({
      getFlagPayloadSync: <T = { type: 'version'; version: string }>() =>
        ({ type: 'version', version: '2.0.0' }) as T,
    });

    config.version = '3.0.0';

    render(<AppUpdateNeeded />);

    expect(screen.queryByTestId('appUpdateNeeded-screen')).toBeNull();
  });

  it('should render the update screen when the flagged version is unsupported', () => {
    jest.spyOn(FeatureFlags, 'useGetRemoteConfigSync').mockReturnValue({
      getFlagPayloadSync: <T = { type: 'version'; version: string }>() =>
        ({ type: 'version', version: '3.0.0' }) as T,
    });

    config.version = '2.0.0';

    render(<AppUpdateNeeded />);

    expect(screen.getByTestId('appUpdateNeeded-screen')).toBeDefined();
  });

  it('should open the stores to allow users to udpdate', async () => {
    config.version = '2.0.0';

    jest.spyOn(FeatureFlags, 'useGetRemoteConfigSync').mockReturnValue({
      getFlagPayloadSync: <T = { type: 'version'; version: string }>() =>
        ({ type: 'version', version: '3.0.0' }) as T,
    });

    const openURL = jest.fn();

    jest.spyOn(Linking, 'openURL').mockImplementation(openURL);

    render(<AppUpdateNeeded />);

    fireEvent.press(screen.getByTestId('appUpdateNeeded-cta'));

    await waitFor(() => {
      expect(openURL).toHaveBeenCalled();
    });
  });
});

import { Linking } from 'react-native';

import { config } from '$domain/constants/config';
import { fireEvent, render, screen, waitFor } from '$domain/testing';
import * as FeatureFlags from '$infra/featureFlags/hooks/useGetRemoteConfigSync';

import { AppUpdateNeeded } from '../AppUpdateNeeded';

describe('AppUpdateNeeded component', () => {
  // Mocks
  jest.spyOn(FeatureFlags, 'useGetRemoteConfigSync').mockReturnValue({
    getFlagPayloadSync: () => undefined,
  });

  afterEach(() => jest.resetAllMocks);

  it('should render nothing if the flag is empty', () => {
    // Given
    render(<AppUpdateNeeded />);

    // Then
    expect(screen.queryByTestId('appUpdateNeeded-screen')).toBeNull();
  });

  it('should render nothing if the versions are equal', () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'useGetRemoteConfigSync').mockReturnValue({
      getFlagPayloadSync: <T = { version: string },>() =>
        ({ version: '2.0.0' }) as T,
    });

    config.version = '2.0.0';

    // Given
    render(<AppUpdateNeeded />);

    // Then
    expect(screen.queryByTestId('appUpdateNeeded-screen')).toBeNull();
  });

  it('should render nothing if the flagged version is supported', () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'useGetRemoteConfigSync').mockReturnValue({
      getFlagPayloadSync: <T = { version: string },>() =>
        ({ version: '2.0.0' }) as T,
    });

    config.version = '3.0.0';

    // Given
    render(<AppUpdateNeeded />);

    // Then
    expect(screen.queryByTestId('appUpdateNeeded-screen')).toBeNull();
  });

  it('should render the update screen when the flagged version is unsupported', () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'useGetRemoteConfigSync').mockReturnValue({
      getFlagPayloadSync: <T = { version: string },>() =>
        ({ version: '3.0.0' }) as T,
    });

    config.version = '2.0.0';

    // Given
    render(<AppUpdateNeeded />);

    // Then
    expect(screen.getByTestId('appUpdateNeeded-screen')).toBeDefined();
  });

  it('should open the stores to allow users to udpdate', async () => {
    // Mocks
    config.version = '2.0.0';

    jest.spyOn(FeatureFlags, 'useGetRemoteConfigSync').mockReturnValue({
      getFlagPayloadSync: <T = { version: string },>() =>
        ({ version: '3.0.0' }) as T,
    });

    const openURL = jest.fn();

    jest.spyOn(Linking, 'openURL').mockImplementation(openURL);

    // Given
    render(<AppUpdateNeeded />);

    // When
    fireEvent.press(screen.getByTestId('appUpdateNeeded-cta'));

    // Then
    await waitFor(() => {
      expect(openURL).toHaveBeenCalled();
    });
  });
});

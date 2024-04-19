import { Linking } from 'react-native';

import { config } from '$core/constants/config';
import * as FeatureFlags from '$core/featureFlags/hooks/useGetFlagValueSync';
import { fireEvent, render, waitFor } from '$core/testing';

import { AppUpdateNeeded } from '../AppUpdateNeeded';

describe('AppUpdateNeeded component', () => {
  // Mocks
  jest.spyOn(FeatureFlags, 'useGetFlagValueSync').mockReturnValue({
    getFlagValueSync: () => '',
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render nothing if the flag is empty', () => {
    // Given
    const { queryByTestId } = render(<AppUpdateNeeded />);

    // Then
    expect(queryByTestId('appUpdateNeeded-screen')).toBeNull();
  });

  it('should render nothing if the versions are equal', () => {
    jest.spyOn(FeatureFlags, 'useGetFlagValueSync').mockReturnValue({
      getFlagValueSync: () => '2.0.0',
    });

    // Given
    const { queryByTestId } = render(<AppUpdateNeeded />);

    // Then
    expect(queryByTestId('appUpdateNeeded-screen')).toBeNull();
  });

  it('should render nothing if the flagged version is supported', () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'useGetFlagValueSync').mockReturnValue({
      getFlagValueSync: () => '2.0.0',
    });

    config.version = '3.0.0';

    // Given
    const { queryByTestId } = render(<AppUpdateNeeded />);

    // Then
    expect(queryByTestId('appUpdateNeeded-screen')).toBeNull();
  });

  it('should render the update screen when the flagged version is unsupported', () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'useGetFlagValueSync').mockReturnValue({
      getFlagValueSync: () => '3.0.0',
    });

    config.version = '2.0.0';

    // Given
    const { getByTestId } = render(<AppUpdateNeeded />);

    // Then
    expect(getByTestId('appUpdateNeeded-screen')).toBeDefined();
  });

  it('should open the stores to allow users to udpdate', async () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'useGetFlagValueSync').mockReturnValue({
      getFlagValueSync: () => '3.0.0',
    });

    const openURL = jest.fn();

    jest.spyOn(Linking, 'openURL').mockImplementation(openURL);

    // Given
    const { getByTestId } = render(<AppUpdateNeeded />);

    // When
    fireEvent.press(getByTestId('appUpdateNeeded-cta'));

    // Then
    await waitFor(() => {
      expect(openURL).toHaveBeenCalled();
    });
  });
});

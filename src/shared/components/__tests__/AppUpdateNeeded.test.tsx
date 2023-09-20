import { config } from '$core/constants/config';
import { FeatureFlags } from '$core/featureFlags';
import { render } from '$core/testing';

import { AppUpdateNeeded } from '../AppUpdateNeeded';

describe('AppUpdateNeeded component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render nothing if the flag is empty', () => {
    // Mocks
    config.version = '1.0.0';
    jest.spyOn(FeatureFlags, 'getFlagValue').mockReturnValue('');

    // Given
    const { queryByTestId } = render(<AppUpdateNeeded />);

    // Then
    expect(queryByTestId('appUpdateNeeded')).toBeNull();
  });

  it('should render nothing if the versions are equal', () => {
    // Mocks
    config.version = '1.0.0';
    jest.spyOn(FeatureFlags, 'getFlagValue').mockReturnValue('1.0.0');

    // Given
    const { queryByTestId } = render(<AppUpdateNeeded />);

    // Then
    expect(queryByTestId('appUpdateNeeded')).toBeNull();
  });

  it('should render nothing if the flagged version is supported', () => {
    // Mocks
    config.version = '1.2.0';
    jest.spyOn(FeatureFlags, 'getFlagValue').mockReturnValue('1.1.0');

    // Given
    const { queryByTestId } = render(<AppUpdateNeeded />);

    // Then
    expect(queryByTestId('appUpdateNeeded')).toBeNull();
  });

  // it('should render the update screen when the flagged version is unsupported', () => {
  //   // Mocks
  //   config.version = '1.2.0';
  //   jest.spyOn(FeatureFlags, 'getStringValue').mockReturnValue('1.4.0');

  //   // Given
  //   const { getByText } = render(<AppUpdateNeeded />);

  //   // Then
  //   expect(getByText(pageTitle)).toBeDefined();
  // });
});

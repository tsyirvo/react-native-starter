import config from '$core/constants/config';
import FeatureFlags from '$core/featureFlags';
import i18n from '$i18n/config';
import { render } from '$tests/utils';

import AppUpdateNeeded from '../AppUpdateNeeded';

describe('AppUpdateNeeded component', () => {
  const pageTitle = i18n.t('appUpdate.title');

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render nothing if the flag is empty', () => {
    // Mocks
    config.version = '1.0.0';
    jest.spyOn(FeatureFlags, 'getStringValue').mockReturnValue('');

    // Given
    const { queryByText } = render(<AppUpdateNeeded />);

    // Then
    expect(queryByText(pageTitle)).toBeNull();
  });

  it('should render nothing if the versions are equal', () => {
    // Mocks
    config.version = '1.0.0';
    jest.spyOn(FeatureFlags, 'getStringValue').mockReturnValue('1.0.0');

    // Given
    const { queryByText } = render(<AppUpdateNeeded />);

    // Then
    expect(queryByText(pageTitle)).toBeNull();
  });

  it('should render nothing if the flagged version is supported', () => {
    // Mocks
    config.version = '1.2.0';
    jest.spyOn(FeatureFlags, 'getStringValue').mockReturnValue('1.1.0');

    // Given
    const { queryByText } = render(<AppUpdateNeeded />);

    // Then
    expect(queryByText(pageTitle)).toBeNull();
  });

  it('should render the update screen when the flagged version is unsupported', () => {
    // Mocks
    config.version = '1.2.0';
    jest.spyOn(FeatureFlags, 'getStringValue').mockReturnValue('1.4.0');

    // Given
    const { getByText } = render(<AppUpdateNeeded />);

    // Then
    expect(getByText(pageTitle)).toBeDefined();
  });
});

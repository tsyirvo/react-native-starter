import FeatureFlags from '$core/featureFlags';
import i18n from '$i18n/config';
import { render } from '$tests/utils';

import MaintenanceMode from '../MaintenanceMode';

describe('MaintenanceMode component', () => {
  const pageTitle = i18n.t('maintenanceMode.title');

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render nothing by default', () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'getBooleanValue').mockReturnValue(false);

    // Given
    const { queryByText } = render(<MaintenanceMode />);

    // Then
    expect(queryByText(pageTitle)).toBeNull();
  });

  it('should render the maintenance mode when the flag is true', () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'getBooleanValue').mockReturnValue(true);

    // Given
    const { queryByText } = render(<MaintenanceMode />);

    // Then
    expect(queryByText(pageTitle)).toBeDefined();
  });
});

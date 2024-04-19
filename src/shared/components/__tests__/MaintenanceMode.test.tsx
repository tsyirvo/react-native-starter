import * as FeatureFlags from '$core/featureFlags/hooks/useIsFeatureFlagEnabled';
import { render } from '$core/testing';

import { MaintenanceMode } from '../MaintenanceMode';

describe('MaintenanceMode component', () => {
  // Mocks
  jest.spyOn(FeatureFlags, 'useIsFeatureFlagEnabled').mockReturnValue(false);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render nothing by default', () => {
    // Given
    const { queryByTestId } = render(<MaintenanceMode />);

    // Then
    expect(queryByTestId('maintenanceMode-screen')).toBeNull();
  });

  it('should render the maintenance mode when the flag is true', () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'useIsFeatureFlagEnabled').mockReturnValue(true);

    // Given
    const { getByTestId } = render(<MaintenanceMode />);

    // Then
    expect(getByTestId('maintenanceMode-screen')).toBeDefined();
  });
});

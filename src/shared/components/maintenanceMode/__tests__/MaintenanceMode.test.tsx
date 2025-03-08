import * as FeatureFlags from '$core/featureFlags/hooks/useGetBooleanFeatureFlag';
import { render, screen } from '$core/testing';

import { MaintenanceMode } from '../MaintenanceMode';

describe('MaintenanceMode component', () => {
  // Mocks
  jest.spyOn(FeatureFlags, 'useGetBooleanFeatureFlag').mockReturnValue(false);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render nothing by default', () => {
    // Given
    render(<MaintenanceMode />);

    // Then
    expect(screen.queryByTestId('maintenanceMode-screen')).toBeNull();
  });

  it('should render the maintenance mode when the flag is true', () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'useGetBooleanFeatureFlag').mockReturnValue(true);

    // Given
    render(<MaintenanceMode />);

    // Then
    expect(screen.getByTestId('maintenanceMode-screen')).toBeDefined();
  });
});

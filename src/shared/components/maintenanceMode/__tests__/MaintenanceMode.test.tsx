import { render, screen } from '$domain/testing';
import * as FeatureFlags from '$infra/featureFlags/hooks/useGetBooleanFeatureFlag';

import { MaintenanceMode } from '../MaintenanceMode';

describe('MaintenanceMode component', () => {
  jest.spyOn(FeatureFlags, 'useGetBooleanFeatureFlag').mockReturnValue(false);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render nothing by default', () => {
    render(<MaintenanceMode />);

    expect(screen.queryByTestId('maintenanceMode-screen')).toBeNull();
  });

  it('should render the maintenance mode when the flag is true', () => {
    jest.spyOn(FeatureFlags, 'useGetBooleanFeatureFlag').mockReturnValue(true);

    render(<MaintenanceMode />);

    expect(screen.getByTestId('maintenanceMode-screen')).toBeDefined();
  });
});

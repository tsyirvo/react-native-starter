import * as FeatureFlags from '$infra/featureFlags/hooks/useGetBooleanFeatureFlag';
import { render, screen } from '$testing';

import { MaintenanceMode } from '../MaintenanceMode';

describe('MaintenanceMode component', () => {
  jest.spyOn(FeatureFlags, 'useGetBooleanFeatureFlag').mockReturnValue(false);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render nothing by default', async () => {
    await render(<MaintenanceMode />);

    expect(screen.queryByTestId('MaintenanceMode')).toBeNull();
  });

  it('should render the maintenance mode when the flag is true', async () => {
    jest.spyOn(FeatureFlags, 'useGetBooleanFeatureFlag').mockReturnValue(true);

    await render(<MaintenanceMode />);

    expect(screen.getByTestId('MaintenanceMode')).toBeDefined();
  });
});

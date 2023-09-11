import FeatureFlags from '$core/featureFlags';
import { render } from '$tests/utils';

import MaintenanceMode from '../MaintenanceMode';

describe('MaintenanceMode component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render nothing by default', () => {
    // Mocks
    jest.spyOn(FeatureFlags, 'getBooleanValue').mockReturnValue(false);

    // Given
    const { queryByTestId } = render(<MaintenanceMode />);

    // Then
    expect(queryByTestId('maintenanceMode')).toBeNull();
  });

  // it('should render the maintenance mode when the flag is true', () => {
  //   // Mocks
  //   jest.spyOn(FeatureFlags, 'getBooleanValue').mockReturnValue(true);

  //   // Given
  //   const { getByText } = render(<MaintenanceMode />);

  //   // Then
  //   expect(getByText(pageTitle)).toBeDefined();
  // });
});

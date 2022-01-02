/* eslint-disable react/jsx-props-no-spreading */

import { HomeScreenNavigationProp } from '$navigation/navigation.types';
import navigationProps from '$tests/defaultNavigationProp';
import { render, fireEvent } from '$tests/utils';

import Home from '../Home';

describe('Home component', () => {
  // Given
  const props = {
    navigation: navigationProps as unknown as HomeScreenNavigationProp,
  };

  it('should render correctly', () => {
    // Given
    const { getByText } = render(<Home {...props} />);

    // Then
    expect(getByText('React Native Starter')).toBeDefined();
  });

  it('should trigger the navigate method when the button is pressed', () => {
    // Given
    const { getByTestId } = render(<Home {...props} />);

    // When
    fireEvent.press(getByTestId('goto_otherPage'));

    // Then
    expect(props.navigation.navigate).toHaveBeenCalled();
  });
});

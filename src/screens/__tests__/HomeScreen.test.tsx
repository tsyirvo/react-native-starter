/* eslint-disable react/jsx-props-no-spreading */

import type { HomeScreenNavigationProp } from '$core/navigation/types/navigation.types';
import { render, fireEvent, navigationProps } from '$core/testing';

import { HomeScreen } from '../HomeScreen';

describe('Home component', () => {
  // Setup
  const props = {
    navigation: navigationProps as unknown as HomeScreenNavigationProp,
  };

  it('should render correctly', () => {
    // Given
    const { getByText } = render(<HomeScreen {...props} />);

    // Then
    expect(getByText('React Native Starter')).toBeDefined();
  });

  it('should trigger the navigate method when the button is pressed', () => {
    // Given
    const { getByTestId } = render(<HomeScreen {...props} />);

    // When
    fireEvent.press(getByTestId('goto_otherScreen'));

    // Then
    expect(props.navigation.navigate).toHaveBeenCalled();
  });
});

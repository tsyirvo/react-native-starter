/* eslint-disable react/jsx-props-no-spreading */

import { OtherScreenNavigationProp } from '$core/navigation/navigation.types';
import { fireEvent, render, navigationProps } from '$core/testing';

import { OtherScreen } from '../OtherScreen';

describe('OtherPage component', () => {
  // Setup
  const props = {
    navigation: navigationProps as unknown as OtherScreenNavigationProp,
  };

  it('should render correctly', () => {
    // Given
    const { getByTestId } = render(<OtherScreen {...props} />);

    // Then
    expect(getByTestId('otherPage_title')).toBeDefined();
  });

  it('should trigger the goBack method when the button is pressed', () => {
    // Given
    const { getByTestId } = render(<OtherScreen {...props} />);

    // When
    fireEvent.press(getByTestId('back_button'));

    // Then
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});

/* eslint-disable react/jsx-props-no-spreading */

import { OtherPageScreenNavigationProp } from '$navigation/navigation.types';
import navigationProps from '$tests/defaultNavigationProp';
import { fireEvent, render } from '$tests/utils';

import OtherPage from '../OtherPage';

describe('OtherPage component', () => {
  // Setup
  const props = {
    navigation: navigationProps as unknown as OtherPageScreenNavigationProp,
  };

  it('should render correctly', () => {
    // Given
    const { getByTestId } = render(<OtherPage {...props} />);

    // Then
    expect(getByTestId('otherPage_title')).toBeDefined();
  });

  it('should trigger the goBack method when the button is pressed', () => {
    // Given
    const { getByTestId } = render(<OtherPage {...props} />);

    // When
    fireEvent.press(getByTestId('back_button'));

    // Then
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});

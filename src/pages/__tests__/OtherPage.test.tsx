/* eslint-disable react/jsx-props-no-spreading */

import i18n from '$i18n/config';
import { OtherPageScreenNavigationProp } from '$navigation/navigation.types';
import navigationProps from '$tests/defaultNavigationProp';
import { render, fireEvent } from '$tests/utils';

import OtherPage from '../OtherPage';

describe('OtherPage component', () => {
  // Given
  const props = {
    navigation: navigationProps as unknown as OtherPageScreenNavigationProp,
  };

  it('should render correctly', () => {
    // Given
    const { getByText } = render(<OtherPage {...props} />);

    // Then
    expect(getByText(i18n.t('otherPage.navigation.title'))).toBeDefined();
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

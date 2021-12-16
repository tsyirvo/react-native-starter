/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import i18n from '$i18n/config';
import { render, fireEvent } from '$tests/utils';

import OtherPage from '../OtherPage';

describe('OtherPage component', () => {
  // Given
  const props = { navigation: { goBack: jest.fn() } as any };

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

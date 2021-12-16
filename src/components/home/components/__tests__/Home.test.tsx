/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, fireEvent } from '$tests/utils';

import Home from '../Home';

describe('Home component', () => {
  // Given
  const props = { navigation: { navigate: jest.fn() } as any };

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

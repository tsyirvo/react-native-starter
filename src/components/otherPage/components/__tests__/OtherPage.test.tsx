import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import render from '$tests/utils';

import OtherPage from '../OtherPage';

describe('OtherPage page component', () => {
  // given
  const props = { navigation: { goBack: jest.fn() } as any };

  it('should render correctly', () => {
    // When
    const wrapper = render(<OtherPage {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the goBack method when the button is pressed', () => {
    // When
    const { getByTestId } = render(<OtherPage {...props} />);

    fireEvent.press(getByTestId('back_button'));

    // Then
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});

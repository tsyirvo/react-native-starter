/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { fireEvent } from '@testing-library/react-native';
import React from 'react';

import render from '$tests/utils';

import Home from '../Home';

describe('Home page component', () => {
  // given
  const props = { navigation: { navigate: jest.fn() } as any };

  it('should render correctly', () => {
    // When
    const wrapper = render(<Home {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the navigate method when the button is pressed', () => {
    // When
    const { getByTestId } = render(<Home {...props} />);

    fireEvent.press(getByTestId('goto_otherPage'));

    // Then
    expect(props.navigation.navigate).toHaveBeenCalled();
  });
});

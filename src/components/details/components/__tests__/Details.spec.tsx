/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { shallow } from 'enzyme';
import { fireEvent } from '@testing-library/react-native';

import render from '@tests/utils';

import Details from '../Details';

describe('Details page component', () => {
  // given
  const props = { navigation: { goBack: jest.fn() } as any };

  it('should render correctly', () => {
    // When
    const wrapper = shallow(<Details {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the goBack method when the button is pressed', () => {
    // When
    const { getByTestId } = render(<Details {...props} />);

    fireEvent.press(getByTestId('back_button'));

    // Then
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});

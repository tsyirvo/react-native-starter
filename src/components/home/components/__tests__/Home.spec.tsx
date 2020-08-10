/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { shallow } from 'enzyme';

import Home from '../Home';

describe('Home page component', () => {
  // given
  const props = { navigation: { navigate: jest.fn() } as any };

  it('should render correctly', () => {
    // When
    const wrapper = shallow(<Home {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the goBack method when the button is pressed', () => {
    // When
    const wrapper = shallow(<Home {...props} />);

    wrapper
      .findWhere((node) => node.prop('testID') === 'goto_details')
      .simulate('press');

    // Then
    expect(props.navigation.navigate.mock.calls.length).toBe(1);
  });
});

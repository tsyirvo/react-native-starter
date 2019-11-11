import React from 'react';
import { shallow } from 'enzyme';

import Details from 'components/details';

describe('Details page component', () => {
  // given
    const props = { navigation: {goBack: jest.fn()} };

  it('should render correctly', () => {
    // When
    const wrapper = shallow(<Details {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the goBack method when the button is pressed', () => {
    // When
    const wrapper = shallow(<Details {...props} />);

    wrapper.findWhere(node => node.prop('testID') === 'back-button').simulate('press');

    // Then
    expect(props.navigation.goBack.mock.calls.length).toBe(1);
  });
});

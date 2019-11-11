import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import Button from 'shared/Button';

describe('Button shared component', () => {
  // given
    const props = { onPress: jest.fn() };
    const child = <Text>Some text</Text>;

  it('should render correctly without children', () => {
    // When
    const wrapper = shallow(<Button {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a children', () => {
    // When
    const wrapper = shallow(<Button {...props}>{child}</Button>);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the onPress props', () => {
    // When
    const wrapper = shallow(<Button {...props}>{child}</Button>);

    wrapper.findWhere(node => node.prop('testID') === 'button-touchable').simulate('press');

    // Then
    expect(props.onPress.mock.calls.length).toBe(1);
  });
});

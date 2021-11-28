/* eslint-disable react/jsx-props-no-spreading */

import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import render from '$tests/utils';

import Button from '../Button';

describe('Shared primitives Button component', () => {
  // given
  const props = { onPress: jest.fn() };
  const child = <Text>Some text</Text>;

  it('should render correctly with a text children', () => {
    // When
    const wrapper = render(<Button {...props}>{child}</Button>);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the onPress props when pressed', () => {
    // When
    const { getByText } = render(<Button {...props}>{child}</Button>);

    fireEvent.press(getByText('Some text'));

    // Then
    expect(props.onPress).toHaveBeenCalled();
  });
});

/* eslint-disable react/jsx-props-no-spreading */

import { fireEvent } from '@testing-library/react-native';

import render from '$tests/utils';

import Button from '../button/Button';

describe('Shared primitives Button component', () => {
  // given
  const props = { onPress: jest.fn(), label: 'Some text' };

  it('should render correctly with a text children', () => {
    // When
    const wrapper = render(<Button {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the onPress props when pressed', () => {
    // When
    const { getByText } = render(<Button {...props} />);

    fireEvent.press(getByText('Some text'));

    // Then
    expect(props.onPress).toHaveBeenCalled();
  });
});

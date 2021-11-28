/* eslint-disable react/jsx-props-no-spreading */

import { fireEvent } from '@testing-library/react-native';
import React from 'react';

import render from '$tests/utils';

import Input from '../Input';

describe('Shared primitives Input component', () => {
  // given
  const props = {
    onChangeText: jest.fn(),
    placeholder: 'Placeholder',
  };

  it('should render correctly', () => {
    // When
    const wrapper = render(<Input {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the onChangeText props when typing', () => {
    // When
    const { getByPlaceholderText } = render(<Input {...props} />);

    const input = getByPlaceholderText('Placeholder');

    fireEvent.changeText(input, 'data');

    // Then
    expect(props.onChangeText).toHaveBeenCalled();
  });

  it('should not show error by default', () => {
    // When
    const { queryByTestId } = render(<Input {...props} />);

    const error = queryByTestId('input-error');

    // Then
    expect(error).toBeNull();
  });

  it('should show error when defined', () => {
    // When
    const { getByTestId } = render(<Input {...props} error="Some error" />);

    const error = getByTestId('input-error');

    // Then
    expect(error).toBeDefined();
  });

  it('should not show a label if not provided', () => {
    // When
    const { queryByTestId } = render(<Input {...props} />);

    const label = queryByTestId('input-label');

    // Then
    expect(label).toBeNull();
  });

  it('should show a label when defined', () => {
    // When
    const { getByTestId } = render(<Input {...props} label="Some label" />);

    const label = getByTestId('input-label');

    // Then
    expect(label).toBeDefined();
  });
});

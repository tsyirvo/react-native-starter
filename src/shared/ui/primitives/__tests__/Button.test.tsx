/* eslint-disable react/jsx-props-no-spreading */

import { render, fireEvent } from '$core/testing';

import { Button } from '../Button';

describe('Button component', () => {
  // Given
  const onPress = jest.fn();
  const label = 'Some text';
  const props = { onPress, label };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with a text', () => {
    // Given
    const { getByText } = render(<Button {...props} />);

    // Then
    expect(getByText(label)).toBeDefined();
  });

  it('should render correctly with a text and a custom variant', () => {
    // Given
    const { getByText } = render(<Button variant="baseDisabled" {...props} />);

    // Then
    expect(getByText(label)).toBeDefined();
  });

  it('should call the onPress method', () => {
    // Given
    const { getByText } = render(<Button {...props} />);

    // When
    fireEvent.press(getByText('Some text'));

    // Then
    expect(onPress).toHaveBeenCalled();
  });

  it('should not call the onPress method when disabled', () => {
    // Given
    const { getByText } = render(<Button isEnabled={false} {...props} />);

    // When
    fireEvent.press(getByText('Some text'));

    // Then
    expect(onPress).not.toHaveBeenCalled();
  });
});

/* eslint-disable react/jsx-props-no-spreading */

import { render, fireEvent } from '$core/testing';

import { Input } from '../Input';

describe('Input component', () => {
  // Given
  const onChangeText = jest.fn();
  const props = { onChangeText, testID: 'input-id' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    // Given
    const { getByTestId } = render(<Input {...props} />);

    // Then
    expect(getByTestId('input-id')).toBeDefined();
  });

  it('should call the onChangeText method when typing', () => {
    // Given
    const { getByTestId } = render(<Input {...props} />);

    // When
    fireEvent.changeText(getByTestId('input-id'), 'data');

    // Then
    expect(onChangeText).toHaveBeenCalled();
  });

  it('should not show error by default', () => {
    // Given
    const { queryByTestId } = render(<Input {...props} />);

    // Then
    expect(queryByTestId('input-errorText')).toBeNull();
  });

  it('should show error when defined', () => {
    // Given
    const { getByTestId } = render(<Input {...props} error="Some error" />);

    // Then
    expect(getByTestId('input-errorText')).toBeDefined();
  });

  it('should not show a label if not provided', () => {
    // Given
    const { queryByTestId } = render(<Input {...props} />);

    // Then
    expect(queryByTestId('input-label')).toBeNull();
  });

  it('should show a label when defined', () => {
    // Given
    const { getByTestId } = render(<Input {...props} label="Some label" />);

    // Then
    expect(getByTestId('input-label')).toBeDefined();
  });
});

/* eslint-disable react/jsx-props-no-spreading */

import { render, fireEvent } from '$core/testing';

import { Input } from '../Input';

describe('Input component', () => {
  // Given
  const onChangeText = jest.fn();
  const props = { onChangeText };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    // Given
    const { getByTestId } = render(<Input {...props} />);

    // Then
    expect(getByTestId('inputID')).toBeDefined();
  });

  it('should call the onChangeText method when typing', () => {
    // Given
    const { getByTestId } = render(<Input {...props} />);

    // When
    fireEvent.changeText(getByTestId('inputID'), 'data');

    // Then
    expect(onChangeText).toHaveBeenCalled();
  });

  it('should not show error by default', () => {
    // Given
    const { queryByTestId } = render(<Input {...props} />);

    // Then
    expect(queryByTestId('inputID-error')).toBeNull();
  });

  it('should show error when defined', () => {
    // Given
    const { getByTestId } = render(<Input {...props} error="Some error" />);

    // Then
    expect(getByTestId('inputID-error')).toBeDefined();
  });

  it('should not show a label if not provided', () => {
    // Given
    const { queryByTestId } = render(<Input {...props} />);

    // Then
    expect(queryByTestId('inputID-label')).toBeNull();
  });

  it('should show a label when defined', () => {
    // Given
    const { getByTestId } = render(<Input {...props} label="Some label" />);

    // Then
    expect(getByTestId('inputID-label')).toBeDefined();
  });
});

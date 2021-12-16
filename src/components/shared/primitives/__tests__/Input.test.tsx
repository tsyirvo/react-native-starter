/* eslint-disable react/jsx-props-no-spreading */

import { render, fireEvent } from '$tests/utils';

import Input from '../input/Input';

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
    const input = getByTestId('inputID');

    fireEvent.changeText(input, 'data');

    // Then
    expect(onChangeText).toHaveBeenCalled();
  });

  it('should not show error by default', () => {
    // Given
    const { queryByTestId } = render(<Input {...props} />);

    const error = queryByTestId('inputID-error');

    // Then
    expect(error).toBeNull();
  });

  it('should show error when defined', () => {
    // Given
    const { getByTestId } = render(<Input {...props} error="Some error" />);

    const error = getByTestId('inputID-error');

    // Then
    expect(error).toBeDefined();
  });

  it('should not show a label if not provided', () => {
    // Given
    const { queryByTestId } = render(<Input {...props} />);

    const label = queryByTestId('inputID-label');

    // Then
    expect(label).toBeNull();
  });

  it('should show a label when defined', () => {
    // Given
    const { getByTestId } = render(<Input {...props} label="Some label" />);

    const label = getByTestId('inputID-label');

    // Then
    expect(label).toBeDefined();
  });
});

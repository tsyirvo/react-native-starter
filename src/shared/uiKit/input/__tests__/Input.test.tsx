/* eslint-disable react/jsx-props-no-spreading */

import { fireEvent, render, screen } from '$domain/testing';

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
    render(<Input {...props} />);

    // Then
    expect(screen.getByTestId('input-id')).toBeDefined();
  });

  it('should call the onChangeText method when typing', () => {
    // Given
    render(<Input {...props} />);

    // When
    fireEvent.changeText(screen.getByTestId('input-id'), 'data');

    // Then
    expect(onChangeText).toHaveBeenCalled();
  });

  it('should not show error by default', () => {
    // Given
    render(<Input {...props} />);

    // Then
    expect(screen.queryByTestId('input-errorText')).toBeNull();
  });

  it('should show error when defined', () => {
    // Given
    render(<Input {...props} error="Some error" />);

    // Then
    expect(screen.getByTestId('input-errorText')).toBeDefined();
  });

  it('should not show a label if not provided', () => {
    // Given
    render(<Input {...props} />);

    // Then
    expect(screen.queryByTestId('input-label')).toBeNull();
  });

  it('should show a label when defined', () => {
    // Given
    render(<Input {...props} label="Some label" />);

    // Then
    expect(screen.getByTestId('input-label')).toBeDefined();
  });
});

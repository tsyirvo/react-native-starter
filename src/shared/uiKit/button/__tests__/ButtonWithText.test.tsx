/* eslint-disable react/jsx-props-no-spreading */

import { fireEvent, render, screen } from '$core/testing';

import { ButtonWithText } from '../ButtonWithText';

describe('Button component', () => {
  // Given
  const label = 'Some text';

  const onPress = jest.fn();
  const props = { onPress };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();

    jest.useRealTimers();
  });

  it('should render correctly with a text', () => {
    // Given
    render(<ButtonWithText {...props}>{label}</ButtonWithText>);

    // Then
    expect(screen.getByText(label)).toBeDefined();
  });

  it('should render correctly with a custom variant', () => {
    // Given
    render(
      <ButtonWithText variant="otherVariant" {...props}>
        {label}
      </ButtonWithText>,
    );

    // Then
    expect(screen.getByText(label)).toBeDefined();
  });

  it('should render correctly with a custom size', () => {
    // Given
    render(
      <ButtonWithText size="small" variant="otherVariant" {...props}>
        {label}
      </ButtonWithText>,
    );

    // Then
    expect(screen.getByText(label)).toBeDefined();
  });

  it('should render correctly when loading', () => {
    // Given
    render(
      <ButtonWithText isLoading {...props}>
        {label}
      </ButtonWithText>,
    );

    // Then
    expect(screen.getByTestId('button-innerText-loader')).toBeDefined();
    expect(screen.queryByTestId('button-innerText-text')).toBeNull();
  });

  it('should not call the onPress method when loading', () => {
    // Given
    render(
      <ButtonWithText testID="buttonId" isLoading {...props}>
        {label}
      </ButtonWithText>,
    );

    // When
    fireEvent.press(screen.getByTestId('buttonId'));

    // Then
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should not call the onPress method when disabled', () => {
    // Given
    render(
      <ButtonWithText isDisabled {...props}>
        {label}
      </ButtonWithText>,
    );

    // When
    fireEvent.press(screen.getByText(label));

    // Then
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should call the onPress method', () => {
    // Given
    render(<ButtonWithText {...props}>{label}</ButtonWithText>);

    // When
    fireEvent.press(screen.getByText(label));

    // Then
    expect(onPress).toHaveBeenCalled();
  });
});

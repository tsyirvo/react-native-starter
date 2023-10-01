/* eslint-disable react/jsx-props-no-spreading */

import { fireEvent, render } from '$core/testing';

import { ButtonWithText } from '../ButtonWithText';

describe('Button component', () => {
  // Given
  const label = 'Some text';

  const onPress = jest.fn();
  const props = { onPress };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with a text', () => {
    // Given
    const { getByText } = render(
      <ButtonWithText {...props}>{label}</ButtonWithText>,
    );

    // Then
    expect(getByText(label)).toBeDefined();
  });

  it('should render correctly with a custom variant', () => {
    // Given
    const { getByText } = render(
      <ButtonWithText variant="otherVariant" {...props}>
        {label}
      </ButtonWithText>,
    );

    // Then
    expect(getByText(label)).toBeDefined();
  });

  it('should render correctly with a custom size', () => {
    // Given
    const { getByText } = render(
      <ButtonWithText size="small" variant="otherVariant" {...props}>
        {label}
      </ButtonWithText>,
    );

    // Then
    expect(getByText(label)).toBeDefined();
  });

  it('should render correctly when loading', () => {
    // Given
    const { getByTestId, queryByTestId } = render(
      <ButtonWithText isLoading {...props}>
        {label}
      </ButtonWithText>,
    );

    // Then
    expect(getByTestId('buttonInnerLoader')).toBeDefined();
    expect(queryByTestId('buttonInnerText')).toBeNull();
  });

  it('should not call the onPress method when loading', () => {
    // Given
    const { getByTestId } = render(
      <ButtonWithText isLoading testID="buttonId" {...props}>
        {label}
      </ButtonWithText>,
    );

    // When
    fireEvent.press(getByTestId('buttonId'));

    // Then
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should not call the onPress method when disabled', () => {
    // Given
    const { getByText } = render(
      <ButtonWithText isDisabled {...props}>
        {label}
      </ButtonWithText>,
    );

    // When
    fireEvent.press(getByText(label));

    // Then
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should call the onPress method', () => {
    // Given
    const { getByText } = render(
      <ButtonWithText {...props}>{label}</ButtonWithText>,
    );

    // When
    fireEvent.press(getByText(label));

    // Then
    expect(onPress).toHaveBeenCalled();
  });
});

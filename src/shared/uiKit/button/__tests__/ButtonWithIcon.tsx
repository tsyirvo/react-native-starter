/* eslint-disable react/jsx-props-no-spreading */

import { fireEvent, render } from '$core/testing';
import type * as AllIcons from '$shared/icons/components';

import { ButtonWithIcon } from '../ButtonWithIcon';

describe('Button component', () => {
  // Given
  const label = 'Some text';

  const iconName: keyof typeof AllIcons = 'Code';
  const onPress = jest.fn();
  const props = { iconName, onPress };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();

    jest.useRealTimers();
  });

  it('should render correctly with a text and icon', () => {
    // Given
    const { getByText, getByTestId } = render(
      <ButtonWithIcon {...props}>{label}</ButtonWithIcon>,
    );

    // Then
    expect(getByText(label)).toBeDefined();
    expect(getByTestId('buttonInnerIcon')).toBeDefined();
  });

  it('should render correctly with a specific icon size', () => {
    // Given
    const { getByText, getByTestId } = render(
      <ButtonWithIcon {...props} height={10} width={10}>
        {label}
      </ButtonWithIcon>,
    );

    // Then
    expect(getByText(label)).toBeDefined();
    expect(getByTestId('buttonInnerIcon')).toBeDefined();
  });

  it('should render correctly with a custom variant', () => {
    // Given
    const { getByText, getByTestId } = render(
      <ButtonWithIcon variant="otherVariant" {...props}>
        {label}
      </ButtonWithIcon>,
    );

    // Then
    expect(getByText(label)).toBeDefined();
    expect(getByTestId('buttonInnerIcon')).toBeDefined();
  });

  it('should render correctly when loading', () => {
    // Given
    const { getByTestId, queryByTestId } = render(
      <ButtonWithIcon isLoading {...props}>
        {label}
      </ButtonWithIcon>,
    );

    // Then
    expect(getByTestId('buttonInnerLoader')).toBeDefined();
    expect(queryByTestId('buttonInnerText')).toBeNull();
    expect(queryByTestId('buttonInnerIcon')).toBeNull();
  });

  it('should not call the onPress method when loading', () => {
    // Given
    const { getByTestId } = render(
      <ButtonWithIcon isLoading testID="buttonId" {...props}>
        {label}
      </ButtonWithIcon>,
    );

    // When
    fireEvent.press(getByTestId('buttonId'));

    // Then
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should not call the onPress method when disabled', () => {
    // Given
    const { getByText } = render(
      <ButtonWithIcon isDisabled {...props}>
        {label}
      </ButtonWithIcon>,
    );

    // When
    fireEvent.press(getByText(label));

    // Then
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should call the onPress method', () => {
    // Given
    const { getByText } = render(
      <ButtonWithIcon {...props}>{label}</ButtonWithIcon>,
    );

    // When
    fireEvent.press(getByText(label));

    // Then
    expect(onPress).toHaveBeenCalled();
  });
});

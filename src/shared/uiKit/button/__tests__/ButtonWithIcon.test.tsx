/* eslint-disable react/jsx-props-no-spreading */

import { fireEvent, render, screen } from '$core/testing';
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
    render(<ButtonWithIcon {...props}>{label}</ButtonWithIcon>);

    // Then
    expect(screen.getByText(label)).toBeDefined();
    expect(screen.getByTestId('button-innerIcon')).toBeDefined();
  });

  it('should render correctly with a specific icon size', () => {
    // Given
    render(
      <ButtonWithIcon {...props} height={10} width={10}>
        {label}
      </ButtonWithIcon>,
    );

    // Then
    expect(screen.getByText(label)).toBeDefined();
    expect(screen.getByTestId('button-innerIcon')).toBeDefined();
  });

  it('should render correctly with a custom variant', () => {
    // Given
    render(
      <ButtonWithIcon variant="otherVariant" {...props}>
        {label}
      </ButtonWithIcon>,
    );

    // Then
    expect(screen.getByText(label)).toBeDefined();
    expect(screen.getByTestId('button-innerIcon')).toBeDefined();
  });

  it('should render correctly when loading', () => {
    // Given
    render(
      <ButtonWithIcon isLoading {...props}>
        {label}
      </ButtonWithIcon>,
    );

    // Then
    expect(screen.getByTestId('button-innerText-loader')).toBeDefined();
    expect(screen.queryByTestId('button-innerText-text')).toBeNull();
    expect(screen.queryByTestId('button-innerIcon')).toBeNull();
  });

  it('should not call the onPress method when loading', () => {
    // Given
    render(
      <ButtonWithIcon testID="button-id" isLoading {...props}>
        {label}
      </ButtonWithIcon>,
    );

    // When
    fireEvent.press(screen.getByTestId('button-id'));

    // Then
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should not call the onPress method when disabled', () => {
    // Given
    render(
      <ButtonWithIcon isDisabled {...props}>
        {label}
      </ButtonWithIcon>,
    );

    // When
    fireEvent.press(screen.getByText(label));

    // Then
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should call the onPress method', () => {
    // Given
    render(<ButtonWithIcon {...props}>{label}</ButtonWithIcon>);

    // When
    fireEvent.press(screen.getByText(label));

    // Then
    expect(onPress).toHaveBeenCalled();
  });
});

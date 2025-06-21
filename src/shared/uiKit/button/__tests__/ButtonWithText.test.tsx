import { composeStories } from '@storybook/react';

import { fireEvent, render, screen } from '$domain/testing';

import * as ButtonsWithText from '../stories/ButtonWithText.stories';

const { BasicButton, ButtonWithVariant, ButtonLoading, ButtonDisabled } =
  composeStories(ButtonsWithText);

describe('Button component', () => {
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
    render(<BasicButton {...props}>{label}</BasicButton>);

    expect(screen.getByText(label)).toBeDefined();
  });

  it('should render correctly with a custom variant', () => {
    render(<ButtonWithVariant {...props}>{label}</ButtonWithVariant>);

    expect(screen.getByText(label)).toBeDefined();
  });

  it('should render correctly when loading', () => {
    render(<ButtonLoading {...props}>{label}</ButtonLoading>);

    expect(screen.getByTestId('InnerTextLoader')).toBeDefined();
  });

  it('should not call the onPress method when loading', () => {
    render(<ButtonLoading {...props}>{label}</ButtonLoading>);

    fireEvent.press(screen.getByTestId('ButtonWithText'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('should not call the onPress method when disabled', () => {
    render(<ButtonDisabled {...props}>{label}</ButtonDisabled>);

    fireEvent.press(screen.getByText(label));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('should call the onPress method', () => {
    render(<BasicButton {...props}>{label}</BasicButton>);

    fireEvent.press(screen.getByText(label));

    expect(onPress).toHaveBeenCalled();
  });
});

import { composeStories } from '@storybook/react';

import { act, render, screen, userEvent } from '$testing';

import * as ButtonsWithText from '../stories/ButtonWithText.stories';

const { BasicButton, ButtonLoading, ButtonDisabled } =
  composeStories(ButtonsWithText);

const label = 'Submit';

describe('ButtonWithText', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('calls the handler once when pressed', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    render(<BasicButton onPress={onPress}>{label}</BasicButton>);

    await user.press(screen.getByText(label));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading content and ignores presses while loading', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    render(<ButtonLoading onPress={onPress}>{label}</ButtonLoading>);

    expect(screen.getByTestId('InnerTextLoader')).toBeOnTheScreen();
    await user.press(screen.getByTestId('ButtonWithText'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('ignores presses when disabled', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    render(<ButtonDisabled onPress={onPress}>{label}</ButtonDisabled>);

    await user.press(screen.getByText(label));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('blocks repeat submissions until the async handler finishes, then accepts another press', async () => {
    const pending = Promise.withResolvers<void>();
    const onPress = jest.fn(() => pending.promise);
    const user = userEvent.setup();
    render(<BasicButton onPress={onPress}>{label}</BasicButton>);

    await user.press(screen.getByText(label));
    act(() => jest.advanceTimersByTime(600));
    expect(screen.getByTestId('InnerTextLoader')).toBeOnTheScreen();
    await user.press(screen.getByTestId('ButtonWithText'));
    expect(onPress).toHaveBeenCalledTimes(1);

    await act(async () => pending.resolve());
    expect(screen.getByText(label)).toBeOnTheScreen();
    act(() => jest.advanceTimersByTime(600));
    await user.press(screen.getByText(label));

    expect(onPress).toHaveBeenCalledTimes(2);
  });
});

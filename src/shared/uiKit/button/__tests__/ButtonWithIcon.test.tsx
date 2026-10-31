import { composeStories } from '@storybook/react';

import { act, render, screen, userEvent } from '$testing';

import * as ButtonsWithIcon from '../stories/ButtonWithIcon.stories';

const { BasicButton, ButtonLoading, ButtonDisabled } =
  composeStories(ButtonsWithIcon);

const label = 'Submit';

describe('ButtonWithIcon', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('calls the handler once when pressed', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(
      <BasicButton iconName="home" onPress={onPress}>
        {label}
      </BasicButton>,
    );

    await user.press(screen.getByText(label));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading content and ignores presses while loading', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(
      <ButtonLoading iconName="home" onPress={onPress}>
        {label}
      </ButtonLoading>,
    );

    expect(screen.getByTestId('InnerTextLoader')).toBeOnTheScreen();
    await user.press(screen.getByTestId('ButtonWithIcon'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('ignores presses when disabled', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(
      <ButtonDisabled iconName="home" onPress={onPress}>
        {label}
      </ButtonDisabled>,
    );

    await user.press(screen.getByText(label));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('blocks repeat submissions until the async handler finishes, then accepts another press', async () => {
    const pending = Promise.withResolvers<void>();
    const onPress = jest.fn(() => pending.promise);
    const user = userEvent.setup();
    await render(
      <BasicButton iconName="home" onPress={onPress}>
        {label}
      </BasicButton>,
    );

    await user.press(screen.getByText(label));
    await act(() => jest.advanceTimersByTime(600));
    expect(screen.getByTestId('InnerTextLoader')).toBeOnTheScreen();
    await user.press(screen.getByTestId('ButtonWithIcon'));
    expect(onPress).toHaveBeenCalledTimes(1);

    await act(async () => pending.resolve());
    expect(screen.getByText(label)).toBeOnTheScreen();
    await act(() => jest.advanceTimersByTime(600));
    await user.press(screen.getByText(label));

    expect(onPress).toHaveBeenCalledTimes(2);
  });
});

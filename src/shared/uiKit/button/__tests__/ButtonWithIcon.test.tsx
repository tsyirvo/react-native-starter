import { composeStories } from '@storybook/react';

import { fireEvent, render, screen } from '$domain/testing';
import type { IconName } from '$shared/icons';

import * as ButtonsWithIcon from '../stories/ButtonWithIcon.stories';

const { BasicButton, ButtonWithVariant, ButtonLoading, ButtonDisabled } =
  composeStories(ButtonsWithIcon);

describe('Button component', () => {
  const label = 'Some text';

  const iconName: IconName = 'Home';
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
    render(<BasicButton {...props}>{label}</BasicButton>);

    expect(screen.getByText(label)).toBeDefined();
    expect(screen.getByTestId('InnerIcon')).toBeDefined();
  });

  it('should render correctly with a custom variant', () => {
    render(<ButtonWithVariant {...props}>{label}</ButtonWithVariant>);

    expect(screen.getByText(label)).toBeDefined();
    expect(screen.getByTestId('InnerIcon')).toBeDefined();
  });

  it('should render correctly when loading', () => {
    render(<ButtonLoading {...props}>{label}</ButtonLoading>);

    expect(screen.getByTestId('InnerTextLoader')).toBeDefined();
    expect(screen.queryByTestId('InnerIcon')).toBeNull();
  });

  it('should not call the onPress method when loading', () => {
    render(<ButtonLoading {...props}>{label}</ButtonLoading>);

    fireEvent.press(screen.getByTestId('ButtonWithIcon'));

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

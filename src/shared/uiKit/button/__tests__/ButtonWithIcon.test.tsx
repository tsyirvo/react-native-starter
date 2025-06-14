import { fireEvent, render, screen } from '$domain/testing';
import type { IconName } from '$shared/icons';

import { ButtonWithIcon } from '../ButtonWithIcon';

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
    render(<ButtonWithIcon {...props}>{label}</ButtonWithIcon>);

    expect(screen.getByText(label)).toBeDefined();
    expect(screen.getByTestId('InnerIcon')).toBeDefined();
  });

  it('should render correctly with a custom variant', () => {
    render(
      <ButtonWithIcon variant="outline" {...props}>
        {label}
      </ButtonWithIcon>,
    );

    expect(screen.getByText(label)).toBeDefined();
    expect(screen.getByTestId('InnerIcon')).toBeDefined();
  });

  it('should render correctly when loading', () => {
    render(
      <ButtonWithIcon isLoading {...props}>
        {label}
      </ButtonWithIcon>,
    );

    expect(screen.getByTestId('InnerTextLoader')).toBeDefined();
    expect(screen.queryByTestId('InnerIcon')).toBeNull();
  });

  it('should not call the onPress method when loading', () => {
    render(
      <ButtonWithIcon testID="button-id" isLoading {...props}>
        {label}
      </ButtonWithIcon>,
    );

    fireEvent.press(screen.getByTestId('button-id'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('should not call the onPress method when disabled', () => {
    render(
      <ButtonWithIcon isDisabled {...props}>
        {label}
      </ButtonWithIcon>,
    );

    fireEvent.press(screen.getByText(label));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('should call the onPress method', () => {
    render(<ButtonWithIcon {...props}>{label}</ButtonWithIcon>);

    fireEvent.press(screen.getByText(label));

    expect(onPress).toHaveBeenCalled();
  });
});

import { fireEvent, render, screen } from '$domain/testing';

import { ButtonWithText } from '../ButtonWithText';

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
    render(<ButtonWithText {...props}>{label}</ButtonWithText>);

    expect(screen.getByText(label)).toBeDefined();
  });

  it('should render correctly with a custom variant', () => {
    render(
      <ButtonWithText variant="outline" {...props}>
        {label}
      </ButtonWithText>,
    );

    expect(screen.getByText(label)).toBeDefined();
  });

  it('should render correctly when loading', () => {
    render(
      <ButtonWithText isLoading {...props}>
        {label}
      </ButtonWithText>,
    );

    expect(screen.getByTestId('InnerTextLoader')).toBeDefined();
  });

  it('should not call the onPress method when loading', () => {
    render(
      <ButtonWithText isLoading {...props}>
        {label}
      </ButtonWithText>,
    );

    fireEvent.press(screen.getByTestId('ButtonWithText'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('should not call the onPress method when disabled', () => {
    render(
      <ButtonWithText isDisabled {...props}>
        {label}
      </ButtonWithText>,
    );

    fireEvent.press(screen.getByText(label));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('should call the onPress method', () => {
    render(<ButtonWithText {...props}>{label}</ButtonWithText>);

    fireEvent.press(screen.getByText(label));

    expect(onPress).toHaveBeenCalled();
  });
});

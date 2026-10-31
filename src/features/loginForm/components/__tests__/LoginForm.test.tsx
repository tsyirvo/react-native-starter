import { Logger } from '$infra/logger';
import { fireEvent, render, screen, userEvent, waitFor } from '$testing';

import { LoginForm } from '../LoginForm';

const emailPlaceholder = 'loginForm.emailField.placeholder';
const passwordPlaceholder = 'loginForm.passwordField.placeholder';

describe('LoginForm', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => jest.useRealTimers());

  it('submits edited credentials through the submit button', async () => {
    const onFormSuccess = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    await render(<LoginForm onFormSuccess={onFormSuccess} />);

    const email = screen.getByPlaceholderText(emailPlaceholder);
    const password = screen.getByPlaceholderText(passwordPlaceholder);
    await user.clear(email);
    await user.type(email, 'member@example.com');
    await user.clear(password);
    await user.type(password, 'new-password');
    await user.press(screen.getByText('loginForm.submitButton'));

    await waitFor(() => expect(onFormSuccess).toHaveBeenCalledTimes(1));
    expect(onFormSuccess).toHaveBeenCalledWith({
      email: 'member@example.com',
      password: 'new-password',
    });
  });

  it('shows validation after blur, blocks both submission paths and recovers after correction', async () => {
    const onFormSuccess = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    await render(<LoginForm onFormSuccess={onFormSuccess} />);

    const email = screen.getByPlaceholderText(emailPlaceholder);
    const password = screen.getByPlaceholderText(passwordPlaceholder);
    await fireEvent.changeText(email, 'invalid');
    expect(
      screen.queryByText('loginForm.emailField.validation.invalid'),
    ).not.toBeOnTheScreen();
    await fireEvent(email, 'blur');
    expect(
      await screen.findByText('loginForm.emailField.validation.invalid'),
    ).toBeOnTheScreen();
    await user.clear(password);
    await user.type(password, 'short');
    expect(
      await screen.findByText('loginForm.passwordField.validation.minLength'),
    ).toBeOnTheScreen();

    await user.press(screen.getByText('loginForm.submitButton'));
    await fireEvent(password, 'submitEditing');
    expect(onFormSuccess).not.toHaveBeenCalled();

    await user.clear(email);
    await user.type(email, 'member@example.com');
    await user.clear(password);
    await user.type(password, 'valid-password', { submitEditing: true });

    await waitFor(() => expect(onFormSuccess).toHaveBeenCalledTimes(1));
    expect(onFormSuccess).toHaveBeenCalledWith({
      email: 'member@example.com',
      password: 'valid-password',
    });
    expect(
      screen.queryByText('loginForm.emailField.validation.invalid'),
    ).not.toBeOnTheScreen();
    expect(
      screen.queryByText('loginForm.passwordField.validation.minLength'),
    ).not.toBeOnTheScreen();
  });

  it('reports a rejected keyboard submission', async () => {
    const error = new Error('sign in unavailable');
    const onFormSuccess = jest.fn().mockRejectedValue(error);
    await render(<LoginForm onFormSuccess={onFormSuccess} />);

    await fireEvent(
      screen.getByPlaceholderText(passwordPlaceholder),
      'submitEditing',
    );

    await waitFor(() =>
      expect(Logger.error).toHaveBeenCalledWith({
        error,
        message: 'Failed to submit login form',
      }),
    );
  });
});

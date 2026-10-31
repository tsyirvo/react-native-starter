import { useState } from 'react';

import { render, screen, userEvent } from '$testing';

import { Input } from '../Input';

const ControlledInput = ({
  onChangeText,
}: {
  onChangeText: (value: string) => void;
}) => {
  const [value, setValue] = useState('');

  return (
    <Input
      onChangeText={(text) => {
        setValue(text);
        onChangeText(text);
      }}
      placeholder="Enter text"
      value={value}
    />
  );
};

describe('Input', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('forwards native text changes and displays the controlled value', async () => {
    const onChangeText = jest.fn();
    const user = userEvent.setup();
    await render(<ControlledInput onChangeText={onChangeText} />);

    await user.type(screen.getByPlaceholderText('Enter text'), 'data');

    expect(onChangeText).toHaveBeenLastCalledWith('data');
    expect(screen.getByDisplayValue('data')).toBeOnTheScreen();
  });

  it('does not accept typing when disabled', async () => {
    const onChangeText = jest.fn();
    const user = userEvent.setup();
    await render(
      <Input isDisabled onChangeText={onChangeText} placeholder="Enter text" />,
    );

    await user.type(screen.getByPlaceholderText('Enter text'), 'data');

    expect(onChangeText).not.toHaveBeenCalled();
  });

  it('renders supplied messages and removes them when no longer provided', async () => {
    const { rerender } = await render(
      <Input
        error="Invalid email"
        helperText="Use your work email"
        label="Email"
      />,
    );

    expect(screen.getByText('Email')).toBeOnTheScreen();
    expect(screen.getByText('Invalid email')).toBeOnTheScreen();
    expect(screen.getByText('Use your work email')).toBeOnTheScreen();

    await rerender(<Input />);

    expect(screen.queryByText('Email')).not.toBeOnTheScreen();
    expect(screen.queryByText('Invalid email')).not.toBeOnTheScreen();
    expect(screen.queryByText('Use your work email')).not.toBeOnTheScreen();
  });
});

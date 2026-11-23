import { useState } from 'react';

import { render, screen, userEvent } from '$testing';

import { Input } from '../Input';

const ControlledInput = ({ onChangeText }: { onChangeText: (value: string) => void }) => {
  const [value, setValue] = useState('');

  return (
    <Input
      label="Email"
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
      <Input isDisabled label="Email" onChangeText={onChangeText} placeholder="Enter text" />,
    );

    await user.type(screen.getByPlaceholderText('Enter text'), 'data');

    expect(onChangeText).not.toHaveBeenCalled();
  });

  it('renders supplied messages and removes them when no longer provided', async () => {
    const { rerender } = await render(
      <Input error="Invalid email" helperText="Use your work email" label="Email" />,
    );

    expect(screen.getByText('Email', { includeHiddenElements: true })).toBeOnTheScreen();
    expect(screen.getByText('Invalid email', { includeHiddenElements: true })).toBeOnTheScreen();
    expect(
      screen.getByText('Use your work email', { includeHiddenElements: true }),
    ).toBeOnTheScreen();

    await rerender(<Input label="Email" />);

    expect(
      screen.queryByText('Invalid email', { includeHiddenElements: true }),
    ).not.toBeOnTheScreen();
    expect(
      screen.queryByText('Use your work email', {
        includeHiddenElements: true,
      }),
    ).not.toBeOnTheScreen();
  });
});

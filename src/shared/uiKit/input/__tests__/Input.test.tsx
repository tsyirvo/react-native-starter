import { composeStories } from '@storybook/react';

import { fireEvent, render, screen } from '$domain/testing';

import * as Inputs from '../stories/Input.stories';

const { Input, WithError, WithHelperText, WithLabel, WithOrnamentIcon } =
  composeStories(Inputs);

describe('Input component', () => {
  const onChangeText = jest.fn();
  const props = { onChangeText };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<Input {...props} />);

    expect(screen.getByTestId('Input')).toBeDefined();
  });

  it('should call the onChangeText method when typing', () => {
    render(<Input {...props} />);

    fireEvent.changeText(screen.getByTestId('Input'), 'data');

    expect(onChangeText).toHaveBeenCalled();
  });

  it('should not show error by default', () => {
    render(<Input {...props} />);

    expect(screen.queryByTestId('InputErrorText')).toBeNull();
  });

  it('should show error when defined', () => {
    render(<WithError {...props} />);

    expect(screen.getByTestId('InputErrorText')).toBeDefined();
  });

  it('should not show helper text by default', () => {
    render(<Input {...props} />);

    expect(screen.queryByTestId('InputHelperText')).toBeNull();
  });

  it('should show helper text when defined', () => {
    render(<WithHelperText {...props} />);

    expect(screen.getByTestId('InputHelperText')).toBeDefined();
  });

  it('should not show a label if not provided', () => {
    render(<Input {...props} />);

    expect(screen.queryByTestId('InputLabel')).toBeNull();
  });

  it('should show a label when defined', () => {
    render(<WithLabel {...props} />);

    expect(screen.getByTestId('InputLabel')).toBeDefined();
  });

  it('should not show an icon if not provided', () => {
    render(<Input {...props} />);

    expect(screen.queryByTestId('Icon')).toBeNull();
  });

  it('should show an icon when defined', () => {
    render(<WithOrnamentIcon {...props} />);

    expect(screen.getByTestId('Icon')).toBeDefined();
  });
});

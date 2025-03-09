import { fireEvent, render, screen } from '$domain/testing';

import { Input } from '../Input';

describe('Input component', () => {
  const onChangeText = jest.fn();
  const props = { onChangeText, testID: 'input-id' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<Input {...props} />);

    expect(screen.getByTestId('input-id')).toBeDefined();
  });

  it('should call the onChangeText method when typing', () => {
    render(<Input {...props} />);

    fireEvent.changeText(screen.getByTestId('input-id'), 'data');

    expect(onChangeText).toHaveBeenCalled();
  });

  it('should not show error by default', () => {
    render(<Input {...props} />);

    expect(screen.queryByTestId('input-errorText')).toBeNull();
  });

  it('should show error when defined', () => {
    render(<Input {...props} error="Some error" />);

    expect(screen.getByTestId('input-errorText')).toBeDefined();
  });

  it('should not show a label if not provided', () => {
    render(<Input {...props} />);

    expect(screen.queryByTestId('input-label')).toBeNull();
  });

  it('should show a label when defined', () => {
    render(<Input {...props} label="Some label" />);

    expect(screen.getByTestId('input-label')).toBeDefined();
  });
});

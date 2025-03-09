import { act, render, screen, waitFor } from '$domain/testing';

import { Loader } from '../Loader';

const DEFAULT_DELAY = 500;

describe('Loader component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initially render a Box placeholder', () => {
    render(<Loader />);

    expect(screen.getByTestId('Loader')).toBeTruthy();
  });

  it('should show the activity indicator after the specified delay', async () => {
    render(<Loader />);

    expect(screen.getByTestId('Loader')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(DEFAULT_DELAY);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('Loader')).toBeNull();
    });

    expect(screen.getByTestId('LoaderActivityIndicator')).toBeTruthy();
  });

  it('should respect custom delay time', async () => {
    const customDelay = 1000;

    render(<Loader delay={customDelay} />);

    act(() => {
      jest.advanceTimersByTime(DEFAULT_DELAY);
    });

    expect(screen.getByTestId('Loader')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(customDelay - DEFAULT_DELAY);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('Loader')).toBeNull();
    });

    expect(screen.getByTestId('LoaderActivityIndicator')).toBeTruthy();
  });
});

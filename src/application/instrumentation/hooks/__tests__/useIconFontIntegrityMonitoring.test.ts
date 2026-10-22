import {
  addFontIntegrityListener,
  type FontIntegrityIssue,
  type FontIntegrityStatus,
} from 'react-native-nano-icons';

import { Logger } from '$infra/logger';
import { renderHook } from '$testing';

import { useIconFontIntegrityMonitoring } from '../useIconFontIntegrityMonitoring';

jest.mock('react-native-nano-icons', () => ({
  addFontIntegrityListener: jest.fn(),
}));
jest.mock('$infra/logger', () => ({ Logger: { error: jest.fn() } }));

type Listener = (
  issue: FontIntegrityIssue,
  status: FontIntegrityStatus,
) => void;

const issue: FontIntegrityIssue = {
  family: 'AppIcons-0f92878a',
  fontFamily: 'AppIcons',
  linking: 'static',
  message: 'Icon font "AppIcons" is missing or out of date',
};

const unsubscribe = jest.fn();
let notify: Listener = () => undefined;

describe('useIconFontIntegrityMonitoring', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(addFontIntegrityListener).mockImplementation((listener) => {
      notify = listener;

      return unsubscribe;
    });
  });

  it('reports found font integrity issues', () => {
    renderHook(useIconFontIntegrityMonitoring);

    notify(issue, 'found');

    expect(Logger.error).toHaveBeenCalledWith({
      error: issue,
      message: issue.message,
    });
  });

  it('ignores resolved font integrity issues', () => {
    renderHook(useIconFontIntegrityMonitoring);

    notify(issue, 'resolved');

    expect(Logger.error).not.toHaveBeenCalled();
  });

  it('stops listening on unmount', () => {
    const { unmount } = renderHook(useIconFontIntegrityMonitoring);

    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});

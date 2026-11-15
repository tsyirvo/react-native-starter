import { AccessibilityInfo } from 'react-native';

import { renderHook } from '$testing';

import { useA11yButtonProps } from '../useA11yButtonProps';

const renderButtonProps = (isLoading: boolean) =>
  renderHook(
    (props: { isLoading: boolean }) =>
      useA11yButtonProps({ isDisabled: false, label: 'Submit', ...props }),
    { initialProps: { isLoading } },
  );

describe('useA11yButtonProps', () => {
  const announceSpy = jest.spyOn(AccessibilityInfo, 'announceForAccessibility');

  beforeEach(() => announceSpy.mockClear());

  it('announces once that loading is complete when loading ends', async () => {
    const { rerender } = await renderButtonProps(true);

    await rerender({ isLoading: true });
    expect(announceSpy).not.toHaveBeenCalled();

    await rerender({ isLoading: false });
    await rerender({ isLoading: false });
    expect(announceSpy).toHaveBeenCalledTimes(1);
    expect(announceSpy).toHaveBeenCalledWith('a11y.loadingComplete');
  });

  it('does not announce when the button never loads', async () => {
    const { rerender } = await renderButtonProps(false);

    await rerender({ isLoading: false });

    expect(announceSpy).not.toHaveBeenCalled();
  });

  it('reports a loading button as busy and disabled', async () => {
    const { result } = await renderButtonProps(true);

    expect(result.current.accessibilityLabel).toBe('Submit, a11y.busy');
    expect(result.current.accessibilityState).toEqual({ disabled: true });
  });
});

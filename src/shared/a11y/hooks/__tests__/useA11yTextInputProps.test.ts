import { renderHook } from '$testing';

import { useA11yTextInputProps } from '../useA11yTextInputProps';

describe('useA11yTextInputProps', () => {
  it('reads the label alone for a required field without error', async () => {
    const { result } = await renderHook(() =>
      useA11yTextInputProps({ isOptional: false, label: 'Email' }),
    );

    expect(result.current.accessibilityLabel).toBe('Email');
  });

  it('reads the optional marker and the error after the label', async () => {
    const { result } = await renderHook(() =>
      useA11yTextInputProps({
        error: 'Invalid email',
        hint: 'Use your work email',
        isOptional: true,
        label: 'Email',
      }),
    );

    expect(result.current.accessibilityLabel).toBe('Email, forms.optional, Invalid email');
    expect(result.current.accessibilityHint).toBe('Use your work email');
  });
});

/* eslint-disable react/jsx-props-no-spreading */

import { createText } from '@shopify/restyle';
import React, { forwardRef } from 'react';

import type { Theme } from '$core/theme';

interface TextProps extends React.ComponentPropsWithRef<typeof PrimitiveText> {
  variant?: 'small' | 'regular' | 'medium' | 'large' | 'xLarge';
}

const PrimitiveText = createText<Theme>();

export const Text = forwardRef(
  ({ variant = 'regular', ...rest }: TextProps, ref) => (
    <PrimitiveText ref={ref} variant={variant} {...rest} />
  ),
);

Text.displayName = 'Text';

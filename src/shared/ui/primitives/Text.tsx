/* eslint-disable react/jsx-props-no-spreading */

import { createText } from '@shopify/restyle';
import { forwardRef } from 'react';

import type { Theme } from '$core/theme';

type TextProps = React.ComponentPropsWithRef<typeof PrimitiveText>;

const PrimitiveText = createText<Theme>();

export const Text = forwardRef(
  ({ variant = 'regular', ...rest }: TextProps, ref) => (
    <PrimitiveText ref={ref} variant={variant} {...rest} />
  ),
);

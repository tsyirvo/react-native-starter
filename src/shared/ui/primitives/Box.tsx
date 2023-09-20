/* eslint-disable react/jsx-props-no-spreading */

import { createBox } from '@shopify/restyle';
import { forwardRef } from 'react';

import type { Theme } from '$core/theme';

export type BoxProps = React.ComponentPropsWithRef<typeof PrimitiveBox>;

const PrimitiveBox = createBox<Theme>();

export const Box = forwardRef(({ ...rest }: BoxProps, ref) => (
  <PrimitiveBox ref={ref} {...rest} />
));

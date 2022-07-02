/* eslint-disable react/jsx-props-no-spreading */

import { createBox } from '@shopify/restyle';
import { forwardRef } from 'react';

import { Theme } from '$styles/theme';

export type BoxProps = React.ComponentPropsWithRef<typeof PrimitiveBox>;

const PrimitiveBox = createBox<Theme>();

const Box = forwardRef(({ ...rest }: BoxProps, ref) => (
  <PrimitiveBox ref={ref} {...rest} />
));

export default Box;

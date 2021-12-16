/* eslint-disable react/jsx-props-no-spreading */

import { boxRestyleFunctions, createBox, useRestyle } from '@shopify/restyle';
import { forwardRef } from 'react';

import { Theme } from '$styles/theme';

export type BoxProps = React.ComponentPropsWithRef<typeof PrimitiveBox>;

const PrimitiveBox = createBox<Theme>();

const Box = forwardRef(({ ...rest }: BoxProps, ref) => {
  const props = useRestyle(boxRestyleFunctions, rest);

  return <PrimitiveBox ref={ref} {...props} />;
});

export default Box;

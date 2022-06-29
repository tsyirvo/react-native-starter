/* eslint-disable react/jsx-props-no-spreading */

import { createText } from '@shopify/restyle';
import { forwardRef } from 'react';

import { Theme } from '$styles/theme';

type TextProps = React.ComponentPropsWithRef<typeof PrimitiveText>;

const PrimitiveText = createText<Theme>();

const Text = forwardRef(({ variant = 'regular', ...rest }: TextProps, ref) => (
  <PrimitiveText ref={ref} variant={variant} {...rest} />
));

export default Text;

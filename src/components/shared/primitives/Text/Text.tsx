/* eslint-disable react/jsx-props-no-spreading */

import { textRestyleFunctions, createText, useRestyle } from '@shopify/restyle';
import { forwardRef } from 'react';

import { Theme } from '$styles/theme';

type TextProps = React.ComponentPropsWithRef<typeof PrimitiveText>;

const PrimitiveText = createText<Theme>();

const Text = forwardRef(({ ...rest }: TextProps, ref) => {
  const props = useRestyle(textRestyleFunctions, rest);

  return <PrimitiveText ref={ref} {...props} />;
});

export default Text;

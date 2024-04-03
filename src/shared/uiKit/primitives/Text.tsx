/* eslint-disable react/jsx-props-no-spreading */

import { createText } from '@shopify/restyle';
import type React from 'react';

import type { FontSizes, Theme } from '$core/theme';

interface TextProps extends React.ComponentPropsWithRef<typeof PrimitiveText> {
  testID?: string;
  variant?: FontSizes;
}

const PrimitiveText = createText<Theme>();

export function Text({ variant = 'regular', testID, ...rest }: TextProps) {
  const accessibilityLabel =
    typeof rest.children === 'string' ? rest.children : undefined;

  return (
    <PrimitiveText
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text"
      testID={testID}
      variant={variant}
      {...rest}
    />
  );
}

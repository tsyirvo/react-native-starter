/* eslint-disable react/jsx-props-no-spreading */

import { createText } from '@shopify/restyle';
import type React from 'react';

import type { Colors, FontSizes, Theme } from '$core/theme';

interface TextProps extends React.ComponentPropsWithRef<typeof PrimitiveText> {
  testID?: string;
  variant?: FontSizes;
  color?: Colors;
}

const PrimitiveText = createText<Theme>();

export const Text = ({
  variant = 'regular',
  color = 'clear',
  testID,
  ...rest
}: TextProps) => {
  const accessibilityLabel =
    typeof rest.children === 'string' ? rest.children : undefined;

  return (
    <PrimitiveText
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text"
      color={color}
      testID={testID}
      variant={variant}
      {...rest}
    />
  );
};

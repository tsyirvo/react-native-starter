import type { VariantProps } from '@shopify/restyle';

import type { Theme } from '$core/theme';

export interface ButtonProps extends VariantProps<Theme, 'buttonVariants'> {
  testID?: string;
  onPress:
    | ((arg: unknown) => Promise<unknown>)
    | ((arg: unknown) => void)
    | undefined;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export type ButtonSize = 'regular' | 'small';

import type { ButtonVariant } from '../buttonVariants';

export interface ButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  onPress:
    | ((arg: unknown) => Promise<unknown>)
    | ((arg?: unknown) => void)
    | undefined;
  targetScale?: number;
  testID?: string;
  variant?: ButtonVariant;
}

import type { ButtonVariant } from '../buttonVariants';

export interface ButtonProps {
  variant?: ButtonVariant;
  testID?: string;
  onPress:
    | ((arg: unknown) => Promise<unknown>)
    | ((arg?: unknown) => void)
    | undefined;
  isDisabled?: boolean;
  isLoading?: boolean;
  targetScale?: number;
}

import { borderRadiiTokens, spacingTokens } from '$domain/theme/tokens';

/* ***** *****  Button Variants  ***** ***** */

const MIN_BUTTON_WIDTH = 100;

export const buttonVariants = {
  outline: {
    borderRadius: borderRadiiTokens.radius_16,
    borderWidth: 1,
    minWidth: MIN_BUTTON_WIDTH,
    paddingHorizontal: spacingTokens.spacing_16,
    paddingVertical: spacingTokens.spacing_8,
  },
  outline_compact: {
    borderRadius: borderRadiiTokens.radius_48,
    borderWidth: 1,
    paddingHorizontal: spacingTokens.spacing_12,
    paddingVertical: spacingTokens.spacing_4,
  },
  primary: {
    borderRadius: borderRadiiTokens.radius_16,
    minWidth: MIN_BUTTON_WIDTH,
    paddingHorizontal: spacingTokens.spacing_16,
    paddingVertical: spacingTokens.spacing_8,
  },
  primary_compact: {
    borderRadius: borderRadiiTokens.radius_48,
    paddingHorizontal: spacingTokens.spacing_12,
    paddingVertical: spacingTokens.spacing_4,
  },
  text: {
    borderRadius: borderRadiiTokens.radius_16,
    paddingHorizontal: spacingTokens.spacing_16,
    paddingVertical: spacingTokens.spacing_8,
  },
  text_compact: {
    paddingHorizontal: spacingTokens.spacing_8,
    paddingVertical: spacingTokens.spacing_4,
  },
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

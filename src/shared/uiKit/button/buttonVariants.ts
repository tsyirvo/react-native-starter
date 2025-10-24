import { borderRadiiTokens, spacingTokens } from '$domain/theme/tokens';

/* ***** *****  Button Variants  ***** ***** */

const MIN_BUTTON_WIDTH = 100;

export const buttonVariants = {
  primary: {
    minWidth: MIN_BUTTON_WIDTH,
    paddingHorizontal: spacingTokens.spacing_16,
    paddingVertical: spacingTokens.spacing_8,
    borderRadius: borderRadiiTokens.radius_16,
  },
  primary_compact: {
    paddingHorizontal: spacingTokens.spacing_12,
    paddingVertical: spacingTokens.spacing_4,
    borderRadius: borderRadiiTokens.radius_48,
  },
  outline: {
    minWidth: MIN_BUTTON_WIDTH,
    paddingHorizontal: spacingTokens.spacing_16,
    paddingVertical: spacingTokens.spacing_8,
    borderRadius: borderRadiiTokens.radius_16,
    borderWidth: 1,
  },
  outline_compact: {
    paddingHorizontal: spacingTokens.spacing_12,
    paddingVertical: spacingTokens.spacing_4,
    borderRadius: borderRadiiTokens.radius_48,
    borderWidth: 1,
  },
  text: {
    paddingHorizontal: spacingTokens.spacing_16,
    paddingVertical: spacingTokens.spacing_8,
    borderRadius: borderRadiiTokens.radius_16,
  },
  text_compact: {
    paddingHorizontal: spacingTokens.spacing_8,
    paddingVertical: spacingTokens.spacing_4,
  },
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

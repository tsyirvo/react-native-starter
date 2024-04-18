/* ***** *****  Button  ***** ***** */

export const buttonVariants = {
  defaults: {
    paddingHorizontal: 'spacing_16',
    paddingVertical: 'spacing_8',
    borderRadius: 'radius_16',
  },
  base: {
    backgroundColor: 'bg_focus',
  },
  otherVariant: {
    backgroundColor: 'dull',
  },
};

export type ButtonVariants = keyof typeof buttonVariants;

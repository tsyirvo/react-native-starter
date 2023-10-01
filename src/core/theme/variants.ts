/* ***** *****  Button  ***** ***** */

export const buttonVariants = {
  defaults: {
    paddingHorizontal: 'spacing_16',
    paddingVertical: 'spacing_8',
    borderRadius: 'spacing_16',
  },
  base: {
    backgroundColor: 'secondary_80',
  },
  otherVariant: {
    backgroundColor: 'primary_60',
  },
};

export type ButtonVariants = keyof typeof buttonVariants;

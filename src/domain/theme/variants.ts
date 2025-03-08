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
  outline: {
    borderWidth: 2,
    borderColor: 'dull',
  },
};

export type ButtonVariants = keyof typeof buttonVariants;

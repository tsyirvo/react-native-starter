/* ***** *****  Button Constants  ***** ***** */

const MIN_WIDTH = 100;

/* ***** *****  Button Variants  ***** ***** */

export const buttonVariants = {
  defaults: {
    paddingHorizontal: 'spacing_16',
    paddingVertical: 'spacing_8',
    borderRadius: 'radius_16',
  },
  primary: {
    minWidth: MIN_WIDTH,
    backgroundColor: 'core_primary',
  },
  primary_compact: {
    paddingHorizontal: 'spacing_12',
    paddingVertical: 'spacing_4',
    borderRadius: 'radius_48',
    backgroundColor: 'core_primary',
  },
  outline: {
    minWidth: MIN_WIDTH,
    borderWidth: 1,
    borderColor: 'border_default',
  },
  outline_compact: {
    paddingHorizontal: 'spacing_12',
    paddingVertical: 'spacing_4',
    borderRadius: 'radius_48',
    borderWidth: 1,
    borderColor: 'border_default',
  },
  text: {
    backgroundColor: 'bg_base',
  },
  text_compact: {
    paddingHorizontal: 'spacing_8',
    paddingVertical: 'spacing_4',
    backgroundColor: 'bg_base',
  },
};

export type ButtonVariants = keyof typeof buttonVariants;

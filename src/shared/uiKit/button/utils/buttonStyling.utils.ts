import {
  COMPACT_ICON_SIZE,
  DEFAULT_ICON_SIZE,
} from '$domain/constants/styling';
import { ButtonVariant, ThemeColors } from '$domain/newTheme/unistyles';

const LOADING_OPACITY = 0;
const REGULAR_OPACITY = 1;

export const getTextOpacity = (isLoading?: boolean) => {
  return isLoading ? LOADING_OPACITY : REGULAR_OPACITY;
};

export const getTextColor = (variant: ButtonVariant): ThemeColors => {
  switch (variant) {
    case 'outline':
    case 'text':
      return 'dark';
    case 'text_compact':
      return 'core_primary';
    case 'outline_compact':
      return 'core_secondary';
    default:
      return 'clear';
  }
};

export const getTextVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary_compact':
    case 'outline_compact':
    case 'text_compact':
      return 'regular';
    default:
      return 'medium';
  }
};

export const getLoaderColor = (variant: ButtonVariant): ThemeColors => {
  switch (variant) {
    case 'outline':
    case 'outline_compact':
    case 'text':
    case 'text_compact':
      return 'dark';
    default:
      return 'clear';
  }
};

export const getIconSize = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary_compact':
    case 'outline_compact':
    case 'text_compact':
      return COMPACT_ICON_SIZE;
    default:
      return DEFAULT_ICON_SIZE;
  }
};

/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */

import theme from '$styles/theme';

export type ThemeInterface = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
